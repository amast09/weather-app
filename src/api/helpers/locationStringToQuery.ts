export enum QueryType {
  ZipCode = "ZipCode",
  LatitudeLongitude = "LatitudeLongitude",
  City = "City",
  CityState = "CityState",
}

export interface ZipCodeQuery {
  readonly queryType: QueryType.ZipCode;
  readonly zipCode: string;
}

export interface LatitudeLongitudeQuery {
  readonly queryType: QueryType.LatitudeLongitude;
  readonly latitude: number;
  readonly longitude: number;
}

export interface CityQuery {
  readonly queryType: QueryType.City;
  readonly city: string;
}

export interface CityStateQuery {
  readonly queryType: QueryType.CityState;
  readonly city: string;
  readonly state: string;
}

export type LocationQuery =
  | ZipCodeQuery
  | LatitudeLongitudeQuery
  | CityQuery
  | CityStateQuery;

const LOCATION_REGEX = /([^,]+),?(.*)$/g;
const FIVE_DIGIT_ZIP_CODE_REGEX = /^\d{5}$/g;

const isValidLatitude = (number: number) => number <= 90 && number >= -90;
const isValidLongitude = (number: number) => number <= 180 && number >= -180;

const locationStringToQuery = (locationString: string): LocationQuery => {
  const locationRegex = new RegExp(LOCATION_REGEX);
  const zipCodeRegex = new RegExp(FIVE_DIGIT_ZIP_CODE_REGEX);
  const matchResult = locationRegex.exec(locationString);
  const firstQueryTerm = matchResult ? matchResult[1].trim() : "";
  const secondQueryTerm =
    matchResult && matchResult[2] !== "" ? matchResult[2].trim() : undefined;

  if (secondQueryTerm !== undefined) {
    const latitude = Number.parseFloat(firstQueryTerm);
    const longitude = Number.parseFloat(secondQueryTerm);

    if (isValidLatitude(latitude) && isValidLongitude(longitude)) {
      return {
        queryType: QueryType.LatitudeLongitude,
        latitude,
        longitude,
      };
    } else {
      return {
        queryType: QueryType.CityState,
        city: firstQueryTerm,
        state: secondQueryTerm,
      };
    }
  } else {
    if (zipCodeRegex.test(firstQueryTerm)) {
      return {
        queryType: QueryType.ZipCode,
        zipCode: firstQueryTerm,
      };
    } else {
      return {
        queryType: QueryType.City,
        city: locationString,
      };
    }
  }
};

export default locationStringToQuery;
