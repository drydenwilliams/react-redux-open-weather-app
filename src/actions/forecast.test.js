import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as ForecastActionCreators from './forecast';
import * as ForecastActionTypes from '../actionTypes/forecast';
import nock from 'nock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {

    describe('when app component mounts', () => {
        afterEach(() => {
            nock.cleanAll()
        });

        it('creates a FETCH_WEATHER_FORECAST_SUCCESS when successfully fetched weather', () => {

            const API_KEY = '87632c1d7a3a0152715d2301a6862972';

            nock('http://api.openweathermap.org')
                .get('/data/2.5/forecast/daily')
                .query({ id: '524901', APPID: API_KEY })
                .reply(200, { 
                    city: 'moscow'
                });

            const expectedActions = [
                { type: ForecastActionTypes.FETCH_WEATHER_FORECAST_REQUEST },
                { type: ForecastActionTypes.FETCH_WEATHER_FORECAST_SUCCESS, payload: { city: 'moscow' } }
            ]
            const store = mockStore({ todos: [] })

            return store.dispatch(ForecastActionCreators.fetchForecast())
                .then(() => { // return of async actions
                    expect(store.getActions()).toEqual(expectedActions)
                })
        });

        it('creates a FETCH_WEATHER_FORECAST_ERROR when an invalid statusCode is returned', () => {
            const API_KEY = '87632c1d7a3a0152715d2301a6862972';

            nock('http://api.openweathermap.org')
                .get('/data/2.5/forecast/daily')
                .query({ id: '524901', APPID: API_KEY })
                .reply(500, { 
                    err: 'unexpected response'
                });

            const expectedActions = [
                { type: ForecastActionTypes.FETCH_WEATHER_FORECAST_REQUEST },
                { type: ForecastActionTypes.FETCH_WEATHER_FORECAST_ERROR, payload: new Error('unexpected response') }
            ]
            const store = mockStore({ todos: [] })

            return store.dispatch(ForecastActionCreators.fetchForecast())
                .then(() => { // return of async actions
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

    });




});