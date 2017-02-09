import React, { PropTypes } from 'react'
import './WeatherLocation.scss';

import { dateFromTimestamp } from '../../utils/date';
import { kelvinToC } from '../../utils/temp';

function WeatherLocation({ cityInfo, weather, temperature, weatherLocation }) {
    const dateTimestamp = weatherLocation.get('dt');
    const forecastDate = dateFromTimestamp(dateTimestamp);

    const location = `${cityInfo.get('name')}, ${cityInfo.get('country')}`;
    const minTemp = weatherLocation.getIn(['temp', 'min']);
    const maxTemp = weatherLocation.getIn(['temp', 'max']);

    const blockName = 'weather-forecasts-list__item';
    const classList = [blockName];

    // Do something on current temp or average temp
    if (kelvinToC(maxTemp).toFixed(0) < 0) {
        classList.push(`${blockName}--freezing`);
    } else {
        classList.push(`${blockName}--cold`);
    }

    return (
        <section className={classList.join(' ')}>
            <h3>{weather.get('description')}</h3>
            <div className="location">{location}</div>

            <div className="weather-content">
                <span className="max-temp">{kelvinToC(maxTemp).toFixed(0)}</span>
                <span className="min-temp">{kelvinToC(minTemp).toFixed(0)}</span>
            </div>

            <date className="forecast-date">{forecastDate}</date>
        </section>
    )
}

WeatherLocation.propTypes = {
    cityInfo: PropTypes.object.isRequired,
    weather: PropTypes.object.isRequired,
    temperature: PropTypes.object.isRequired,
    weatherLocation: PropTypes.object.isRequired,
}


export default WeatherLocation;