import locationStringToQuery, {
  CityQuery,
  CityStateQuery,
  LatitudeLongitudeQuery,
  QueryType,
  ZipCodeQuery,
} from "./locationStringToQuery";

describe("locationStringToQuery", () => {
  it("parses to a zip code when parsing a 5 digit number string", () => {
    const locationString = "29464";
    const expectedResult: ZipCodeQuery = {
      queryType: QueryType.ZipCode,
      zipCode: locationString,
    };

    expect(locationStringToQuery(locationString)).toEqual(expectedResult);
  });

  it("parses to a city when parsing a 4 digit number string", () => {
    const locationString = "2946";
    const expectedResult: CityQuery = {
      queryType: QueryType.City,
      city: locationString,
    };

    expect(locationStringToQuery(locationString)).toEqual(expectedResult);
  });

  it("parses to a city when parsing a 6 digit number string", () => {
    const locationString = "294644";
    const expectedResult: CityQuery = {
      queryType: QueryType.City,
      city: locationString,
    };

    expect(locationStringToQuery(locationString)).toEqual(expectedResult);
  });

  it("parses to a city when parsing an arbitrary string", () => {
    const locationString = "Clemson";
    const expectedResult: CityQuery = {
      queryType: QueryType.City,
      city: locationString,
    };

    expect(locationStringToQuery(locationString)).toEqual(expectedResult);
  });

  it("parses to a city when parsing an empty string", () => {
    const locationString = "";
    const expectedResult: CityQuery = {
      queryType: QueryType.City,
      city: locationString,
    };

    expect(locationStringToQuery(locationString)).toEqual(expectedResult);
  });

  it("parses to a latitude and longitude when provided latitude between -90,90 and longitude between -180,180 separated by a comma", () => {
    const latitude = 0;
    const longitude = 0;
    const locationString = `${latitude}, ${longitude}`;
    const expectedResult: LatitudeLongitudeQuery = {
      queryType: QueryType.LatitudeLongitude,
      latitude,
      longitude,
    };

    expect(locationStringToQuery(locationString)).toEqual(expectedResult);
  });

  it("parses to a city state when parsing a comma separated string that has coordinates flipped", () => {
    const latitude = "89";
    const longitude = "179";
    const locationString = `${longitude}, ${latitude}`;
    const expectedResult: CityStateQuery = {
      queryType: QueryType.CityState,
      city: longitude,
      state: latitude,
    };

    expect(locationStringToQuery(locationString)).toEqual(expectedResult);
  });

  it("parses to a city state when parsing a comma separated string that has out of bounds coordinates", () => {
    const latitude = "10000";
    const longitude = "-10000";
    const locationString = `${latitude}, ${longitude}`;
    const expectedResult: CityStateQuery = {
      queryType: QueryType.CityState,
      city: latitude,
      state: longitude,
    };

    expect(locationStringToQuery(locationString)).toEqual(expectedResult);
  });

  it("parses to a city state when parsing a comma separated string", () => {
    const city = "Clemson";
    const state = "SC";
    const locationString = `${city}, ${state}`;
    const expectedResult: CityStateQuery = {
      queryType: QueryType.CityState,
      city,
      state,
    };

    expect(locationStringToQuery(locationString)).toEqual(expectedResult);
  });
});
