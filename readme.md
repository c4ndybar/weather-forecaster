# FizzBuzz

An implementation of FizzBuzz.

## Getting started

Install Jasmine
```
npm install --save-dev jasmine
npx jasmine init
```

## Requirements
Make a weather forecast application that gives the weather forecast for the current day.
The application should prompt for a city name and them provide the forecast for the city in the following format.
```
The forecast for <city> is <temperature description>, <humidity description>, <wind description>, and calls for <weather state>.
```
An example in plain text...
```
The forecast for Las Vegas is hot, dry, windy, and calls for lots of sun.
```

#### Rules for forecast componenets

| Weather component| Value         | Description Text  |
| ---------------- |:-------------:|:------------------|
| temperature         | >= 80 | hot  |
| temperature         | <= 55      |   cold |
| temperature    | > 55 and < 80      |    _no description_ |
| humidity         | >= 85 | humid  |
| humidity         | <= 10      |   dry |
| humidity    | > 10 and < 85      |    _no description_ |
| wind         | >= 10 | windy  |
| wind         | <= 1      |   calm |
| wind    | > 1 and < 10      |    _no description_ |

The weather state will come from the [metaweather api](https://www.metaweather.com/api/).  Use the weather state abbreviation code to determine the description text.
| Weather state abbreviation code | Description Text  |
| ---------------- |:-------------:|:------------------|
| sn | snow |
| sl | sleet |
| h | hail |
| t | thunderstorms |
| hr | heavy rain |
| lr | light drizzle |
| s | showers |
| hc | cloudy skies |
| lc | partly sunny skies |
| c | lots of sun |

The forecast description should read normally even if certain parts of the forecast are omitted.
Fore example, if there is only a description for wind (and none for temperature or humidity), the forecast would be the following...
```
The forecast for Las Vegas is windy and calls for lots of sun.
```
If there is no description for anything except the weather state, then only include that...
```
The forecast for Las Vegas calls for lots of sun.
```
## Implementation
Use the [metaweather api](https://www.metaweather.com/api/) to get the weather forecast for the city.

The function `getForecastDescription` in `src/forecaster.js` should return the description as described in the requirements.

