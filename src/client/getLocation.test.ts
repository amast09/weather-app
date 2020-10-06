import getLocation from "./getLocation";

describe("getLocation", () => {
  let mockNavigator: any;

  beforeEach(() => {
    mockNavigator = {
      geolocation: {
        getCurrentPosition: jest.fn(),
      },
    };
  });

  it("returns undefined when the navigator fails to retrieve the location", async () => {
    mockNavigator.geolocation.getCurrentPosition = (
      _: () => {},
      error: () => {}
    ) => {
      error();
    };

    await expect(getLocation(mockNavigator)).rejects.toEqual(undefined);
  });

  it("returns the result from the navigator", async () => {
    const expectedPosition: Position = {
      coords: {
        accuracy: 1,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: 12.8245,
        longitude: -94.3242,
        speed: null,
      },
      timestamp: 1601346501215,
    };
    mockNavigator.geolocation.getCurrentPosition = (
      success: (position: Position) => {},
      _: () => {}
    ) => {
      success(expectedPosition);
    };

    await expect(getLocation(mockNavigator)).resolves.toEqual(expectedPosition);
  });
});
