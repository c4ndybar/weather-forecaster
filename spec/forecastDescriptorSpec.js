const forecastDescriptor = require('../src/forecastDescriptor')
const weatherStates = require('../src/weatherStates')

describe('unit.forecastDescriptor.describe', () => {
  let forecast

  beforeEach(() => {
    forecast = {
      temperature: 70,
      humidity: 50,
      windSpeed: 5,
      weatherState: weatherStates.sunny
    }
  })

  it('shows weather for multi city name', () => {
    let description = forecastDescriptor.describe('San Francisco', forecast)

    expect(description).toEqual('San Francisco will be sunny.')
  })

  it('describes a sunny forecast', () => {
    let description = forecastDescriptor.describe('London', forecast)

    expect(description).toEqual('London will be sunny.')
  })

  it('describes a snowy forecast', () => {
    forecast.weatherState = weatherStates.snow
    let description = forecastDescriptor.describe('London', forecast)

    expect(description).toEqual('London will be snowy.')
  })

  it('describes a sleet forecast', () => {
    forecast.weatherState = weatherStates.sleet
    let description = forecastDescriptor.describe('London', forecast)

    expect(description).toEqual('London will be sleety.')
  })

  it('describes a hail forecast', () => {
    forecast.weatherState = weatherStates.hail
    let description = forecastDescriptor.describe('London', forecast)

    expect(description).toEqual('London will be haily.')
  })

  it('describes a thunderstorm forecast', () => {
    forecast.weatherState = weatherStates.thunderstorms
    let description = forecastDescriptor.describe('London', forecast)

    expect(description).toEqual('London will be stormy.')
  })

  it('describes a heavy rain forecast', () => {
    forecast.weatherState = weatherStates.heavyRain
    let description = forecastDescriptor.describe('London', forecast)

    expect(description).toEqual('London will be very rainy.')
  })

  it('describes a light rain forecast', () => {
    forecast.weatherState = weatherStates.lightRain
    let description = forecastDescriptor.describe('London', forecast)

    expect(description).toEqual('London will be slightly rainy.')
  })

  it('describes a showers forecast', () => {
    forecast.weatherState = weatherStates.showers
    let description = forecastDescriptor.describe('London', forecast)

    expect(description).toEqual('London will be rainy.')
  })

  it('describes a cloudy forecast', () => {
    forecast.weatherState = weatherStates.cloudy
    let description = forecastDescriptor.describe('London', forecast)

    expect(description).toEqual('London will be cloudy.')
  })

  it('describes a partly sunny forecast', () => {
    forecast.weatherState = weatherStates.partlySunny
    let description = forecastDescriptor.describe('London', forecast)

    expect(description).toEqual('London will be partly sunny.')
  })

  describe('with temperature', () => {

    it('describes a hot and sunny day', ()=> {
      forecast.temperature = 80
      let description = forecastDescriptor.describe('London', forecast)

      expect(description).toEqual('London will be hot and sunny.')
    })

    it('describes a hot and sunny day when temperature is really high', ()=> {
      forecast.temperature = 100
      let description = forecastDescriptor.describe('London', forecast)

      expect(description).toEqual('London will be hot and sunny.')
    })

    it('does not include temperature if temp is just below 80', ()=> {
      forecast.temperature = 79
      let description = forecastDescriptor.describe('London', forecast)

      expect(description).toEqual('London will be sunny.')
    })

    it('describes a cold and sunny day', ()=> {
      forecast.temperature = 55
      let description = forecastDescriptor.describe('London', forecast)

      expect(description).toEqual('London will be cold and sunny.')
    })

    it('describes super cold temperatures as cold', ()=> {
      forecast.temperature = -55
      let description = forecastDescriptor.describe('London', forecast)

      expect(description).toEqual('London will be cold and sunny.')
    })

    it('stops describing temperature if it is just above 55 degrees', ()=> {
      forecast.temperature = 56
      let description = forecastDescriptor.describe('London', forecast)

      expect(description).toEqual('London will be sunny.')
    })
  })

  describe('with humidity', () => {
    it('is humid outside if humidity is at 90 percent', () => {
      forecast.humidity = 90
      let description = forecastDescriptor.describe('London', forecast)

      expect(description).toEqual('London will be humid and sunny.')
    })

    it('is humid outside if humidity is at 100 percent', () => {
      forecast.humidity = 90
      let description = forecastDescriptor.describe('London', forecast)

      expect(description).toEqual('London will be humid and sunny.')
    })

    it('does not include humidity if value is just under 90', () => {
      forecast.humidity = 89
      let description = forecastDescriptor.describe('London', forecast)

      expect(description).toEqual('London will be sunny.')
    })

    it('is dry outside if humidity is at 10 percent', () => {
      forecast.humidity = 10
      let description = forecastDescriptor.describe('London', forecast)

      expect(description).toEqual('London will be dry and sunny.')
    })

    it('is dry outside if humidity is at 0 percent', () => {
      forecast.humidity = 0
      let description = forecastDescriptor.describe('London', forecast)

      expect(description).toEqual('London will be dry and sunny.')
    })

    it('does not include humidity if value is just above 10', () => {
      forecast.humidity = 11
      let description = forecastDescriptor.describe('London', forecast)

      expect(description).toEqual('London will be sunny.')
    })
  })

  describe('with temperature and humidity', () => {
    it('is hot and humid', () => {
      forecast.humidity = 100
      forecast.temperature = 100
      let description = forecastDescriptor.describe('London', forecast)

      expect(description).toEqual('London will be hot, humid, and sunny.')
    })
  })

})
