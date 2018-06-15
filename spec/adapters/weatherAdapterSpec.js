const {weatherAdapter, ForecastNotFoundError} = require('../../src/adapters/weatherAdapter')
const weatherClient = require('../../src/clients/weatherClient')
const timekeeper = require('timekeeper')
const weatherStates = require('../../src/weatherStates')

describe('unit.weatherAdapter', () => {
  let searchCitySpy, getForecastSpy, mockedForecast
  let cityId = 39398

  beforeEach(() => {
    let time = new Date(2018, 6, 15)
    timekeeper.freeze(time)

    searchCitySpy = spyOn(weatherClient, 'searchCitiesByName')
    searchCitySpy.and.returnValue(Promise.resolve(
      [
        {
          title: 'New York',
          location_type: 'City',
          woeid: 2459115,
          latt_long: '40.71455,-74.007118',
        },
        {
          title: 'York',
          location_type: 'City',
          woeid: cityId,
          latt_long: '53.96196,-1.09045',
        },
      ],
    ))

    mockedForecast = {
      id: 5047652047650816,
      weather_state_name: 'Heavy Cloud',
      weather_state_abbr: 'hc',
      wind_direction_compass: 'WSW',
      created: '2018-06-15T13:54:47.347650Z',
      applicable_date: '2018-06-15',
      min_temp: 10.2675,
      max_temp: 16.602499999999999,
      the_temp: 16.129999999999999,
      wind_speed: 6.4713794109069696,
      wind_direction: 254.21441721502373,
      air_pressure: 1019.5,
      humidity: 66,
      visibility: 8.2269545852223018,
      predictability: 71,
    }

    getForecastSpy = spyOn(weatherClient, 'getForecast')
    getForecastSpy.and.returnValue(Promise.resolve([
      mockedForecast,
      {
        'id': 6743698528272384,
        'weather_state_name': 'Heavy Cloud',
        'weather_state_abbr': 'hc',
        'wind_direction_compass': 'E',
        'created': '2018-06-15T12:11:43.991160Z',
        'applicable_date': '2018-06-15',
        'min_temp': 18.33666666666667,
        'max_temp': 26.800000000000001,
        'the_temp': 26.060000000000002,
        'wind_speed': 1.6638041493226225,
        'wind_direction': 88.539512340954474,
        'air_pressure': 1015.49,
        'humidity': 67,
        'visibility': 15.582746758927861,
        'predictability': 71,
      },
      {
        'id': 6501276212789248,
        'weather_state_name': 'Heavy Cloud',
        'weather_state_abbr': 'hc',
        'wind_direction_compass': 'ESE',
        'created': '2018-06-15T09:11:45.121520Z',
        'applicable_date': '2018-06-15',
        'min_temp': 18.330000000000002,
        'max_temp': 27.026666666666667,
        'the_temp': 25.925000000000001,
        'wind_speed': 1.945906482655956,
        'wind_direction': 114.58911644742345,
        'air_pressure': 1015.49,
        'humidity': 67,
        'visibility': 14.840208184204247,
        'predictability': 71,
      },
    ]))
  })

  afterEach(() => {
    timekeeper.reset()
  })

  it('gets the forecast for the specified city from the api', (done) => {
    weatherAdapter.getTodaysForecastForCity('York')
      .then(() => {
        expect(searchCitySpy).toHaveBeenCalledWith('York')
        expect(getForecastSpy).toHaveBeenCalledWith(cityId, jasmine.any(Date))
      })
      .catch(fail)
      .then(done)
  })

  it('throws an error if the city is not found', (done) => {
    searchCitySpy.and.returnValue(Promise.resolve([]))

    weatherAdapter.getTodaysForecastForCity('York')
      .then(fail)
      .catch((err) => expect(err).toEqual(jasmine.any(ForecastNotFoundError)))
      .then(done)
  })

  it('gets the forecast for today', (done) => {
    weatherAdapter.getTodaysForecastForCity('York')
      .then(() => {
        let forecastDate = getForecastSpy.calls.argsFor(0)[1]
        expect(forecastDate.getFullYear()).toEqual(2018)
        expect(forecastDate.getMonth()).toEqual(6)
        expect(forecastDate.getDate()).toEqual(15)
      })
      .catch(fail)
      .then(done)
  })

  it('still finds the city with weird casing', (done) => {
    weatherAdapter.getTodaysForecastForCity('yoRK')
      .then(() => {
        expect(getForecastSpy).toHaveBeenCalledWith(cityId, jasmine.any(Date))
      })
      .catch(fail)
      .then(done)
  })

  it('gets the forecast temperature', (done) => {
    weatherAdapter.getTodaysForecastForCity('York')
      .then((forecast) => {
        expect(forecast.temperature).toEqual(16)
      })
      .catch(fail)
      .then(done)
  })

  it('gets the forecast humidity', (done) => {
    weatherAdapter.getTodaysForecastForCity('York')
      .then((forecast) => {
        expect(forecast.humidity).toEqual(66)
      })
      .catch(fail)
      .then(done)
  })

  describe('weather states', () => {
    function expectWeatherStateFromAbbreviation(weatherStateAbbreviation, expectedWeatherState) {
      it(`transforms weather state abbreviation ${weatherStateAbbreviation} to weather state ${expectedWeatherState}`, (done) => {
        mockedForecast.weather_state_abbr = weatherStateAbbreviation

        weatherAdapter.getTodaysForecastForCity('York')
          .then((forecast) => {
            expect(forecast.weatherState).toEqual(expectedWeatherState)
          })
          .catch(fail)
          .then(done)
      })
    }

    expectWeatherStateFromAbbreviation('sn', weatherStates.snow)
    expectWeatherStateFromAbbreviation('sl', weatherStates.sleet)
    expectWeatherStateFromAbbreviation('h', weatherStates.hail)
    expectWeatherStateFromAbbreviation('t', weatherStates.thunderstorms)
    expectWeatherStateFromAbbreviation('hr', weatherStates.heavyRain)
    expectWeatherStateFromAbbreviation('lr', weatherStates.lightRain)
    expectWeatherStateFromAbbreviation('s', weatherStates.showers)
    expectWeatherStateFromAbbreviation('hc', weatherStates.cloudy)
    expectWeatherStateFromAbbreviation('lc', weatherStates.partlySunny)
    expectWeatherStateFromAbbreviation('c', weatherStates.sunny)
  })
})
