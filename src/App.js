import React, { Component } from 'react';
import './App.css';
import beaches from './lib/beaches.json'
import WeatherHub from './components/WeatherHub'
import Navigation from './components/Navigation'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      beach: beaches[0],
      weather: {}
    }
    this.currentConditionsUrl = 'http://dataservice.accuweather.com/currentconditions/v1/'
    this.dailyForecastUrl = 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/'
    this.apiKey = 'YwfJx1C71cfcG7lWmtiTbOfAquqydhH3'

    this.handleBeachClick = this.handleBeachClick.bind(this)
  }

  componentWillMount() {
    this.updateWeather()
  }

  getUrl(apiUrl, key) {
    return `${apiUrl}${key}?apikey=${this.apiKey}&details=true`
  }

  updateWeather() {
    this.getWeather()
    this.getDayForecast()
  }

  getDayForecast() {
    const beach = this.state.beach
    const url = this.getUrl(this.dailyForecastUrl, beach.key)
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const forecast = data.DailyForecasts[0]
        const day = forecast.Day
        const weatherObj = {
          hoursOfSun: forecast.HoursOfSun,
          rainProbability: day.RainProbability,
          hoursOfRain: day.HoursOfRain,
          cloudCover: day.CloudCover
        }

        this.setState({
          weather: {...this.state.weather, ...weatherObj }
        })
      })
      .catch(error => console.log('An error occurred during fetch', error))

  }

  handleBeachClick(beach) {
    this.setState({
      beach: beach
    }, () => this.updateWeather())
  }

  getWeather() {
    const beach = this.state.beach
    const url = this.getUrl(this.currentConditionsUrl, beach.key)

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const currentWeather = data[0]
        const realFeel = currentWeather.RealFeelTemperature.Metric.Value
        const weatherObj = {
          uvIndex: currentWeather.UVIndex,
          uvIndexText: currentWeather.UVIndexText,
          weatherText: currentWeather.WeatherText,
          realFeel,
          link: currentWeather.Link,
          isRaining: currentWeather.HasPrecipitation,
          weatherIcon: currentWeather.WeatherIcon
        }
        this.setState({
          weather: {...this.state.weather, ...weatherObj}
        })
      })
      .catch(error => console.log('An error occurred during fetch', error))
  }
  
  render() {
    return (
      <div className="App">
        <WeatherHub beach={this.state.beach} weather={this.state.weather} />
        <Navigation activeBeach={this.state.beach.name} beaches={beaches} handleBeachClick={this.handleBeachClick} />
        <a href={this.state.weather.link} className="external-link" target="blank">
          <i className="fas fa-external-link-square-alt"></i>
        </a>
      </div>
    );
  }
}

export default App;
