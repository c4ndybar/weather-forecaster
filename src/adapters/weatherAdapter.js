const weatherStates = require('../weatherStates')
const metaWeatherClient = require('../clients/metaWeatherApiClient')

class ForecastNotFoundError extends Error {
}

module.exports = {
  weatherAdapter: {
    async getTodaysForecastForCity(cityName) {
      const cityId = await getCityId(cityName)

      const forecasts = await metaWeatherClient.getForecast(cityId, new Date())

      return transformForecast(forecasts[0])
    },
  },
  ForecastNotFoundError,
}


async function getCityId(cityName) {
  const cities = await metaWeatherClient.searchCitiesByName(cityName)
  const city = cities.find((city) => city.title.toLowerCase() === cityName.toLowerCase())

  if (!city) {
    throw new ForecastNotFoundError()
  }
  return city.woeid
}

function transformForecast(forecast) {
  return {
    temperature: Math.round(celsiusToFahrenheit(forecast.the_temp)),
    humidity: forecast.humidity,
    weatherState: getWeatherStateFromApiCode(forecast.weather_state_abbr),
  }
}

function celsiusToFahrenheit(temp) {
  return (temp * 9 / 5) + 32
}

function getWeatherStateFromApiCode(apiCode) {
  return Object.values(weatherStates).find((state) => state.apiCode === apiCode)
}
