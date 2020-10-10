# Requirements

- [x] Use OpenWeather API to retrieve weather data

## MVP

- [x] Browser attempts to get lat/lon using Browser Geo Location APIs
- [x] Lat and lon used to request weather data
- [x] Display loading screen when weather request is in flight
- [x] Error screen for failed network request
- [x] Error screen for denied Geo location access
- [x] Display current weather on successful request of data
- [x] Search input classifies the following queries to use with Weather API
  - [x] Lat lon
  - [x] Zipcode
  - [x] City
  - [x] State
  - [x] City, State
- [x] Use cutsie pictures for weather condition id https://openweathermap.org/weather-conditions#How-to-get-icon-URL
- [x] Convert to imperial units
- [x] Component level tests for display components
- [x] Deploy to EC2 instance with docker on CI
- [x] Update README about where CI deploys
- [x] Update README with local prod deploy
- [ ] Fix AWS Load Balancer to allow domain name + https
- [ ] Abstract out a component from App component to write additional component tests

## Post MVP Release

- [ ] 5 day forecast
- [ ] Debounce loading treatments
- [ ] Display time format better
- [ ] Allow unit configuration
- [ ] Enriched error messages for Geo Location failures
- [ ] Enriched error messages for Open Weather API request failures
