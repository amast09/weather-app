# Requirements

- [x] Use OpenWeather API to retrieve weather data

## MVP

- [x] Browser attempts to get lat/lon using Browser Geo Location APIs
- [x] Lat and lon used to request weather data
- [x] Display loading screen when weather request is in flight
- [x] Error screen for failed network request
- [x] Error screen for denied Geo location access
- [x] Display current weather on successful request of data
- [ ] Pull display components into own files
- [ ] Component level tests for display components
- [ ] Style Application
- [ ] Use cutsie pictures for weather condition id https://openweathermap.org/weather-conditions#How-to-get-icon-URL
- [ ] Add https to AWS deploy to allow for Geo Location

## Greedy Release

- [ ] Search input that accepts zipcode
- [ ] Application retrieves weather data when user hits enter or submit button
      when search input has a value
- [ ] Clicking location button clears input
- [ ] Display what is currently being used for weather data (zip code vs lat lon)
- [ ] Error screen for if zip code returns no data

## Extra Greedy Release

- [ ] 5 day forecast
- [ ] Allow unit configuration
- [ ] Search input classifies the following queries to use with Weather API
  - [ ] Lat lon
  - [ ] Zipcode
  - [ ] City
  - [ ] State
  - [ ] City, State
  - [ ] City, State, Zip code
- [ ] Enriched error messages for Geo Location failures
- [ ] Enriched error messages for Open Weather API request failures
- [ ] Try again button for failed weather data load
