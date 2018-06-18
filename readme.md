# Weather Forecaster

An application that will provide the weather forecast in plain English for the provided city name.

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
| temperature         | >= 80°F | hot  |
| temperature         | <= 55°F     |   cold |
| temperature    | > 55°F and < 80°F      |    _no description_ |
| humidity         | >= 60 | humid  |
| humidity         | <= 20 | dry |
| humidity    | > 10 and < 85      |    _no description_ |


The weather state description will be based on the response from the [metaweather api](https://www.metaweather.com/api/).  Use the weather state abbreviation code to determine the description text.

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

### Examples

Example for Las Vegas on June, 15th...
```json
[
  {
    "weather_state_abbr": "c",
    "applicable_date": "2018-06-15",
    "the_temp": 50, //this is in Celsius
    "humidity": 10
  },
  {...},
  {...}
]
// expected description
// Las Vegas will be hot, dry, and sunny.
```
If humidity was at 20, it would be omitted and the description would read...
```
Las Vegas will be hot and sunny.
```
If the temperature was only 70°F and was also omitted, the description would read...
```
Las Vegas will be sunny.
```
The description should always read in a gramatically correct way regardless of which forecast components are omitted from the description.

Finally, If the weather API does not have a forecast available for the provided city, display an appropriate message.
## Implementation
Use the [metaweather api](https://www.metaweather.com/api/) to get the weather forecast for the city.
Note that the temperatures returned by the API are in Celsius.

The function `getForecastDescription` in `src/forecaster.js` should return the description as described in the requirements.
You can run the `index.js` script from the command line to run the app end to end.
