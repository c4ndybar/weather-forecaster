const weatherStates = require('../weatherStates')
const weatherClient = require('../clients/weatherClient')

class ForecastNotFoundError extends Error {}

module.exports = {
  weatherAdapter: {
    getTodaysForecastForCity
  },
  ForecastNotFoundError
}

async function getTodaysForecastForCity(cityName) {
  let cityId = await getCityId(cityName)

  let forecasts = await weatherClient.getForecast(cityId, new Date())
  let forecast = forecasts[0]

  return transformForecast(forecast)
}

async function getCityId(cityName) {
  let cities = await weatherClient.searchCitiesByName(cityName)
  let city = cities.find((city) => city.title.toLowerCase() === cityName.toLowerCase())

  if (!city) {
    throw new ForecastNotFoundError()
  }
  return city.woeid
}

function transformForecast(forecast) {
  return {
    temperature: Math.round(forecast.the_temp),
    humidity: forecast.humidity,
    weatherState: weatherStateFromAbbreviation(forecast.weather_state_abbr)
  }
}

function weatherStateFromAbbreviation(abbreviation) {
  return Object.values(weatherStates).find((state) => state.apiCode === abbreviation)
}
