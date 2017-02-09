import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

// Styles and Assets
import './App.scss';

// Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WeatherLocation from '../../components/WeatherLocation';

// Action Creators
import * as ForecastActionCreators from '../../actions/forecast';


class App extends React.Component {

  static propTypes = {
    fetchWeatherForecastSuccess: PropTypes.bool,
    fetchWeatherForecastError: PropTypes.bool,
    weatherForecast: ImmutablePropTypes.map,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(ForecastActionCreators.fetchForecast());
  }

  renderWeatherForecasts() {
    const { weatherForecast } = this.props;
    const cityInfo = weatherForecast.get('city');
    const weeklyForecastList = weatherForecast.get('list');
    return (
      <main className="weather-forecasts-list">
        {weeklyForecastList.map((weatherLocation, index) => (
          <WeatherLocation
            key={index}
            cityInfo={cityInfo}
            weatherLocation={weatherLocation}
            weather={weatherLocation.getIn(['weather', 0])}
            temperature={weatherLocation.get('temp')}
          />
        ))}
      </main>
    );
  }

  renderPreloader() {
    return (
      <div>Loading...</div>
    )
  }

  render(props) {
    const { fetchWeatherForecastSuccess } = this.props;

    const blockName = 'app';
    const classList = [blockName];
    return (
      <div className={classList.join(' ')}>
        <Header text="Weekly Weather Forecast" />
        {fetchWeatherForecastSuccess ? this.renderWeatherForecasts() : this.renderPreloader()}
        <Footer text="Footer text" />
      </div>
    );
  }
}


function mapStateToProps(store) {
  return {
    fetchWeatherForecastSuccess: store.forecasts.get('fetchWeatherForecastSuccess'),
    fetchWeatherForecastError: store.forecasts.get('fetchWeatherForecastError'),
    weatherForecast: store.forecasts.get('weatherForecast'),
  }
}

export default connect(mapStateToProps)(App);
