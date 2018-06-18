const proxyquire = require('proxyquire')
const requestSpy = jasmine.createSpy('requestSpy')
const metaWeatherClient = proxyquire('../../src/clients/metaWeatherApiClient', {'request-promise': requestSpy})

describe('unit.weatherClient', () => {
  let returnedPromise

  afterAll(() => proxyquire.callThru())

  beforeEach(() => {
    returnedPromise = Promise.resolve()

    requestSpy.and.returnValue(returnedPromise)
  })

  describe('.searchCitiesByName', () => {
    it('passes the correct options', async () => {
      await metaWeatherClient.searchCitiesByName('Columbus')

      const expectedOptions = {
        method: 'GET',
        url: 'https://www.metaweather.com/api/location/search/',
        qs: {query: 'Columbus'},
        rejectUnauthorized: false,
        json: true,
      }

      expect(requestSpy).toHaveBeenCalledWith(expectedOptions)
    })

    it('returns the promise from the request', () => {
      const actual = metaWeatherClient.searchCitiesByName('Columbus')
      expect(actual).toBe(returnedPromise)
    })
  })

  describe('getForecast', () => {
    it('passes the correct options', async () => {
      await metaWeatherClient.getForecast(1234, new Date(2018, 8, 18))

      const expectedOptions = {
        method: 'GET',
        url: 'https://www.metaweather.com/api/location/1234/2018/8/18/',
        rejectUnauthorized: false,
        json: true,
      }

      expect(requestSpy).toHaveBeenCalledWith(expectedOptions)
    })

    it('returns the promise from the request', () => {
      const actual = metaWeatherClient.getForecast(1234, new Date(2018, 8, 18))
      expect(actual).toBe(returnedPromise)
    })
  })
})

