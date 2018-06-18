#!/usr/bin/env node
const forecaster = require('./src/forecaster')

const city = process.argv[2]

forecaster.getTodaysForecastDescription(city)
  .then(console.log)
  .catch(console.error)
