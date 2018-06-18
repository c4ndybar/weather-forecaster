#!/usr/bin/env node
const forecaster = require('./src/forecaster')

let city = process.argv[2]

forecaster.getForecastDescription(city)
  .then(console.log)
  .catch(console.error)
