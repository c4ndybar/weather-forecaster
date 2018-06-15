# FizzBuzz

An implementation of FizzBuzz.

## Getting started

Install Jasmine
```
npm install --save-dev jasmine
npx jasmine init
```

## Requirements
Make a weather forecast application that gives the a plain text description for the current day's weather forecast (like a weatherman might provide).
The application should prompt for a city name and them provide the forecast for the city in the following format.
```
<city> will be <temperature description>, <humidity description>, and <weather state description>.
```
An example in plain text...
```
Las Vegas will be hot, dry, and sunny.
```

### Determining the text to display
Use this table to determine when to say it's hot/cold, humid/dry, etc.

| Weather component| Value         | Description Text  |
| ---------------- |:-------------:|:------------------|
| temperature         | >= 80 | hot  |
| temperature         | <= 55      |   cold |
| temperature    | > 55 and < 80      |    _no description_ |
| humidity         | >= 60 | humid  |
| humidity         | <= 20 | dry |
| humidity    | > 10 and < 85      |    _no description_ |


The weather state description will be based on the response from the[metaweather api](https://www.metaweather.com/api/).  Use the weather state abbreviation code to determine the description text.

| Weather state abbreviation code | Description Text  |
| ---------------- |:------------------|
| sn | snowy |
| sl | sleety |
| h | haily |
| t | stormy |
| hr | very rainy |
| lr | slightly rainy|
| s | rainy |
| hc | cloudy |
| lc | partly sunny |
| c | sunny |

The forecast description should read normally even if certain parts of the forecast are omitted.
Fore example, if there is only a description for temperature (and none for humidity), the forecast would be the following...
```
Las Vegas will be hot and sunny.
```
If there is no description for anything except the weather state, then only include that...
```
Las Vegas will be sunny.
```

If the weather API does not have a forecast available for the provided city, display an appropriate message.
## Implementation
Use the [metaweather api](https://www.metaweather.com/api/) to get the weather forecast for the city.
Note that the temperatures returned by the API are in Celcius.

The function `getForecastDescription` in `src/forecaster.js` should return the description as described in the requirements.

