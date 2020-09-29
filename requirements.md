# Requirements

- [ ] Use OpenWeather API to retrieve weather data

## MVP

- [ ] Browser attempts to get lat/lng using Browser Geo Location APIs
- [ ] Lat and lng used to request weather data
- [ ] Display loading screen when weather request is in flight
- [ ] Error screen for failed network request
- [ ] Error screen for denied Geo location access
- [ ] 5 day forecast displayed on successful request of data

## Greedy Release

- [ ] Search input that accepts zipcode
- [ ] Application retrieves weather data when user hits enter or submit button
- [ ] Add a button to allow user to programmatically request current location
  - [ ] Clicking location button clears input
- [ ] Display what is currently being used for weather data (zip code vs lat lng)
- [ ] Error screen for if zip code returns no data

## Extra Greedy Release

- [ ] Search input classifies the following queries to use with Weather API
  - [ ] Lat Lng
  - [ ] Zipcode
  - [ ] City
  - [ ] State
  - [ ] City, State
  - [ ] City, State, Zip code
- [ ] Enriched error messages for Geo Location errors
