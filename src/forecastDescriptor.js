module.exports = {
  /**
   *
   * @param {string} city - Name of the city to get the forecast for.
   * @param {Object} forecast - Object containing forecast information.
   * @param {number} forecast.temperature - The forecast temperature in Celsius.
   * @param {number} forecast.humidity - The forecast humidity level.
   * @param {weatherState} forecast.weatherState - The forecast weather state.
   * @return {string}
   */
  describe(city, {temperature, humidity, weatherState}) {
    const temperatureDescription = getTemperatureDescription(temperature)
    const humidityDescription = getHumidityDescription(humidity)
    const weatherStateDescription = weatherState.description

    return buildDescription(city, temperatureDescription, humidityDescription, weatherStateDescription)
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

function getTemperatureDescription(temperature) {
  if (temperature >= 80) {
    return 'hot'
  } else if (temperature <= 55) {
    return 'cold'
  }
}

function getHumidityDescription(humidity) {
  if (humidity >= 60) {
    return 'humid'
  } else if (humidity <= 20) {
    return 'dry'
  }
}
