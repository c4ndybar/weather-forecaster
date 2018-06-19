# Weather Forecaster

An application that will provide the weather forecast in plain English for the provided city name.

### Running the Application
You can run the `index.js` script.
```bash
npm install
node index.js <city name>
```

Or, you can install this package globally and run from the command line with the `forecast` command.
```bash
npm install --global
forecast <city name>
```

Please keep in mind that this application is hitting a free publically available API, so try not to hammer it :)

## Requirements
Make a weather forecast application that gives the a plain text description for the current day's weather forecast (like a weatherman might provide).  Use the [metaweather api](https://www.metaweather.com/api/) to get the weather forecast data for the current day.

The application should prompt for a city name and them provide the today's weather forecast for the city in the following format.
```
<city> will be <temperature description>, <humidity description>, and <weather state description>.
```
An example in plain text...
```
Las Vegas will be hot, dry, and sunny.
```

### Determining the text to display

##### Temperature
| temperature value | temperature description|
|:-------------:|:------------------|
| >= 80°F | hot  |
| <= 55°F     |   cold |
| > 55°F and < 80°F      |    _no description_ |

##### Humidity
| humidity value | humidity description|
|:-------------:|:------------------|
| >= 60 | humid  |
| <= 20 | dry |
| > 10 and < 85      |    _no description_ |


##### Weather State
The weather state description will be based on the response from the [metaweather api](https://www.metaweather.com/api/).  Use the weather state abbreviation code to determine the description text.

| Weather state abbreviation (from api) | Weather state description|
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

MetaWeather API response:
```json
[
  {
    "weather_state_abbr": "c",
    "applicable_date": "2018-06-15",
    "the_temp": 50,
    "humidity": 10
  },
  ...
]
```
Output should be...
```
Las Vegas will be hot, dry, and sunny.
```
If humidity was at 20, it would be omitted and the description would read...
```
Las Vegas will be hot and sunny.
```
If the temperature was only 70°F and was also omitted, the description would read...
```
Las Vegas will be sunny.
```
The description should always read naturally and use proper grammar.

Finally, If the weather API does not have a forecast available for the provided city, display an appropriate message.

