const weatherStates = require('../src/weatherStates')
const {weatherAdapter, ForecastNotFoundError} = require('../src/adapters/weatherAdapter')
const forecastDescriptor = require('../src/forecastDescriptor')
const forecaster = require('../src/forecaster')

describe('unit.forecaster', () => {
  let getForecastSpy, describeSpy
  const forecast = {
    temperature: 70,
    humidity: 50,
    windSpeed: 5,
    weatherState: weatherStates.sunny,
  }

  const forecastDescription = 'London will be sunny.'

  beforeEach(() => {
    getForecastSpy = spyOn(weatherAdapter, 'getTodaysForecastForCity')
    getForecastSpy.and.returnValue(Promise.resolve(forecast))

    describeSpy = spyOn(forecastDescriptor, 'describe')
    describeSpy.and.returnValue(forecastDescription)
  })

  it('gets the forecast for the provided city', (done) => {
    forecaster.getTodaysForecastDescription('London')
      .then((forecastDescription) => {
        expect(getForecastSpy).toHaveBeenCalledWith('London')
        expect(describeSpy).toHaveBeenCalledWith('London', forecast)
        expect(forecastDescription).toEqual(forecastDescription)
      })
      .catch(fail)
      .then(done)
  })

  it('if no forecast is available for the city then give a generic message', (done) => {
    getForecastSpy.and.returnValue(Promise.reject(new ForecastNotFoundError()))

    forecaster.getTodaysForecastDescription('London')
      .then((forecastDescription) => {
        expect(getForecastSpy).toHaveBeenCalledWith('London')
        expect(describeSpy).not.toHaveBeenCalled()
        expect(forecastDescription).toEqual('Sorry, there is no forecast available for London.')
      })
      .catch(fail)
      .then(done)
  })

  it('if no city name is provided, ask the user to provide a city.', (done) => {
    forecaster.getTodaysForecastDescription()
      .then((forecastDescription) => {
        expect(getForecastSpy).not.toHaveBeenCalled()
        expect(describeSpy).not.toHaveBeenCalled()
        expect(forecastDescription).toEqual('You must provide a city name to get the forecast.')
      })
      .catch(fail)
      .then(done)
  })
})
