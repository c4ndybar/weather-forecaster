const requestPromise = require('request-promise')

module.exports = {
  /**
   *
   * @param {string} cityName - The name of the city to search for.
   * @return {Promise<{metaWeatherApiLocationSearchResponse}>} - See documentation at https://www.metaweather.com/api/#locationsearch
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
   * @param {number} cityId - Meta Weather API City Id to get the forecast for.
   * @param {Date} date - Date to get forecast for.
   * @return {Promise<{metaWeatherApiLocationDayResponse}>} - See documentation at https://www.metaweather.com/api/#locationday
   */
  getForecast(cityId, date) {
    const options = {
      method: 'GET',
      url: `https://www.metaweather.com/api/location/${cityId}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/`,
      rejectUnauthorized: false,
      json: true,
    }

    return requestPromise(options)
  },
}


