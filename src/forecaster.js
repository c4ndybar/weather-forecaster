const forecastDescriptor = require('./forecastDescriptor')
const {weatherAdapter, ForecastNotFoundError} = require('./adapters/weatherAdapter')

module.exports = {
  async getTodaysForecastDescription(city) {
    try {
      if (!city) {
        return 'You must provide a city name to get the forecast.'
      }

      const forecast = await weatherAdapter.getTodaysForecastForCity(city)
      return forecastDescriptor.describe(city, forecast)
    } catch (err) {
      if (err instanceof ForecastNotFoundError) {
        return `Sorry, there is no forecast available for ${city}.`
      } else {
        throw err
      }
    }
  },
}
