import {combineReducers} from 'redux';

import forecastReducer from './forecastReducer';

// Join all reducer objects together to create a store
const allReducers = combineReducers({
    forecasts: forecastReducer
})

export default allReducers;
