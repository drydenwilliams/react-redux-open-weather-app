import fetch from 'isomorphic-fetch';

import {
    FETCH_WEATHER_FORECAST_REQUEST,
    FETCH_WEATHER_FORECAST_SUCCESS,
    FETCH_WEATHER_FORECAST_ERROR
} from '../actionTypes/forecast';

function fetchingWeatherForecastsRequest() {
    return {
        type: FETCH_WEATHER_FORECAST_REQUEST
    }
}

function fetchedWeatherForecastSuccess(weatherForecast) {
    return {
        type: FETCH_WEATHER_FORECAST_SUCCESS,
        payload: weatherForecast
    }
}

function fetchedWeatherForecastError(err) {
    return {
        type: FETCH_WEATHER_FORECAST_ERROR,
        payload: err,
    }
}

export function fetchForecast() {
    return (dispatch) => {
        const API_KEY = '87632c1d7a3a0152715d2301a6862972';
        const openWeatherUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?id=524901&APPID=${API_KEY}`;
        dispatch(fetchingWeatherForecastsRequest());
        return fetch(openWeatherUrl)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('unexpected response');
                }

                return response.json();
            })
            .then(responseJSON => dispatch(fetchedWeatherForecastSuccess(responseJSON)))
            .catch(err => dispatch(fetchedWeatherForecastError(err)))
    }
}
