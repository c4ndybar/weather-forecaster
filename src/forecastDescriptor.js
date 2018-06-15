
module.exports = {
  describe: (city, forecast) => {
    let temperature = getTemperatureDescription(forecast )
    let humidity = getHumidityDescription(forecast)
    let weatherState = forecast.weatherState.description

    return buildDescription(city, temperature, humidity, weatherState)
  },
}

function buildDescription(city, temperature, humidity, weatherState) {
  let description = `${city} will be `

  if (temperature && humidity) {
    description += `${temperature}, ${humidity}, and `
  } else if (temperature) {
    description += `${temperature} and `
  } else if (humidity) {
    description += `${humidity} and `
  }

  return `${description}${weatherState}.`
}

function getTemperatureDescription(forecast) {
  if (forecast.temperature >= 80) {
    return 'hot'
  } else if (forecast.temperature <= 55) {
    return 'cold'
  }
}

function getHumidityDescription(forecast) {
  if (forecast.humidity >= 60) {
    return 'humid'
  } else if (forecast.humidity <= 20) {
    return 'dry'
  }
}
