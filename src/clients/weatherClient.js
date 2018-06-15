const requestPromise = require('request-promise')

module.exports = {
  searchCitiesByName, getForecast
}

function searchCitiesByName(cityName) {
  let options = {
    method: 'GET',
    url: `https://www.metaweather.com/api/location/search/`,
    qs: {query: cityName},
    rejectUnauthorized: false,
    json: true,
  }

  return requestPromise(options)
}

function getForecast(cityId, date) {
  let options = {
    method: 'GET',
    url: `https://www.metaweather.com/api/location/${cityId}/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}/`,
    rejectUnauthorized: false,
    json: true,
  }

  return requestPromise(options)
}
