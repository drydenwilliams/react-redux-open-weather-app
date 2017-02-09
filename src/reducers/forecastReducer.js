import { Map, fromJS } from 'immutable';

const initialState = Map({
    fetchWeatherForecastRequest: null,
    fetchWeatherForecastSuccess: null,
    fetchWeatherForecastError: null,
    weatherForecast: fromJS({}),
});

function forecastReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_WEATHER_FORECAST_REQUEST':
            return state
                .set('fetchWeatherForecastRequest', true);
        case 'FETCH_WEATHER_FORECAST_SUCCESS':
            return state
                .set('fetchWeatherForecastSuccess', true)
                .set('weatherForecast', fromJS(action.payload));
        case 'FETCH_WEATHER_FORECAST_ERROR':
            return state
                .set('fetchWeatherForecastError', true);
        default:
            return state;
   }
}


export default forecastReducer;