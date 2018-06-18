const requestPromise = require('request-promise')

module.exports = {
  /**
   *
   * @param cityName - The name of the city to search for.
   * @returns {Promise<{metaWeatherApiSearchResponse}>}
   */
  searchCitiesByName(cityName) {
    const options = {
      method: 'GET',
      url: 'https://www.metaweather.com/api/location/search/',
      qs: {query: cityName},
      rejectUnauthorized: false,
      json: true,
    }

    return requestPromise(options)
  },
  /**
   *
   * @param cityId - Meta Weather API City Id to get the forecast for.
   * @param date - Date to get forecast for.
   * @returns {Promise<{metaWeatherApiForecastByDateResponse}>} - 
   */
  getForecast(cityId, date) {
    const options = {
      method: 'GET',
      url: `https://www.metaweather.com/api/location/${cityId}/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}/`,
      rejectUnauthorized: false,
      json: true,
    }

    return requestPromise(options)
  },
}


