const forecastDescriptor = require('./forecastDescriptor')
const {weatherAdapter, ForecastNotFoundError} = require('./adapters/weatherAdapter')

module.exports = {
  /**
   *
   * @param {string} cityName - Name of city to get the forecast description for.
   * @return {Promise<{string}>} - The forecast description.
   */
  async getTodaysForecastDescription(cityName) {
    try {
      if (!cityName) {
        return 'You must provide a city name to get the forecast.'
      }

      const forecast = await weatherAdapter.getTodaysForecastForCity(cityName)
      return forecastDescriptor.describe(cityName, forecast)
    } catch (err) {
      if (err instanceof ForecastNotFoundError) {
        return `Sorry, there is no forecast available for ${cityName}.`
      } else {
        throw err
      }
    }
  },
}
