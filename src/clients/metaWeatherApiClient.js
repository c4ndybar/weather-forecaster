const requestPromise = require('request-promise')

module.exports = {
  searchCitiesByName, getForecast,
}

function searchCitiesByName(cityName) {
  const options = {
    method: 'GET',
    url: 'https://www.metaweather.com/api/location/search/',
    qs: {query: cityName},
    rejectUnauthorized: false,
    json: true,
  }

  return requestPromise(options)
}

function getForecast(cityId, date) {
  const options = {
    method: 'GET',
    url: `https://www.metaweather.com/api/location/${cityId}/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}/`,
    rejectUnauthorized: false,
    json: true,
  }

  return requestPromise(options)
}
