const emojiMap = {
  sun: '☀️',
  cloudySun: '⛅',
  cloudy: '☁️',
  rain: '🌧️',
  storm: '🌩️',
  snow: '🌨️',
  hot: '🔥',
  windy: '🌬️',
  other: '🤷‍♂️'
}

export default num => {
  if (num <= 2) return emojiMap.sun
  else if (num <= 5) return emojiMap.cloudySun
  else if (num <= 11) return emojiMap.cloudy
  else if (num <= 14 || num === 18) return emojiMap.rain
  else if (num <= 17) return emojiMap.storm
  else if (num <= 29) return emojiMap.snow
  else if (num === 30) return emojiMap.hot
  else if (num === 32) return emojiMap.windy
  return emojiMap.other
}