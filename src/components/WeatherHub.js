import React from 'react'
import getIcon from '../lib/getIcon'

const WeatherHub = ({ beach, weather }) => {
  if (!beach || !weather) return null
  const {
    realFeel, weatherText, uvIndex, uvIndexText, weatherIcon,
    hoursOfSun, rainProbability, hoursOfRain, cloudCover
   } = weather
  return (
    <div className="weather-container">
      <div className="weather-summary">
        <div className="box weather-temp">
          <span className="large-text">{realFeel}°C</span>
          <span className="small-text text-title">UV: {uvIndex} ({uvIndexText})</span>
        </div>
        <div className="box weather-text">
          <span className="weather-icon">{getIcon(weatherIcon)}</span>
          <span className="text-title">{weatherText}</span>
        </div>
        <div className="box weather-rain">
          <span className="weather-small-icon">☔</span>
          <span className="small-text text-title">Rain</span>
          <span className="small-text">{rainProbability}%</span>
          {hoursOfRain > 0 && <span className="small-text">{hoursOfRain} Hours</span>}
        </div>
        <div className="box weather-sun">
          <span className="weather-small-icon">☀️</span>
          <span className="small-text text-title">Sun</span>
          <span className="small-text">{hoursOfSun} Hours</span>
        </div>
        <div className="box weather-clouds">
          <span className="weather-small-icon">☁️</span>
          <span className="small-text text-title">Cloud Cover</span>
          <span className="small-text">{cloudCover}%</span>
        </div>
      </div>
    </div>
  )
}

export default WeatherHub