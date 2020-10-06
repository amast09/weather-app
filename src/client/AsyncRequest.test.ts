import {
  AsyncRequestCompleted,
  AsyncRequestFailed,
  AsyncRequestKinds,
  AsyncRequestLoading,
  AsyncRequestNotStarted,
} from "./AsyncRequest";

describe("AsyncRequest", () => {
  describe("AsyncRequestNotStarted", () => {
    it("correctly constructs the data structure", () => {
      expect(AsyncRequestNotStarted()).toEqual({
        kind: AsyncRequestKinds.NotStarted,
      });
    });
  });

  describe("AsyncRequestLoading", () => {
    it("correctly constructs the data structure", () => {
      expect(AsyncRequestLoading()).toEqual({
        kind: AsyncRequestKinds.Loading,
      });
    });
  });

  describe("AsyncRequestFailed", () => {
    it("correctly constructs the data structure", () => {
      const expectedError = 100;

      expect(AsyncRequestFailed(expectedError)).toEqual({
        kind: AsyncRequestKinds.Failed,
        error: expectedError,
      });
    });
  });
  describe("AsyncRequestCompleted", () => {
    it("correctly constructs the data structure", () => {
      const expectedResult = "complete!";

      expect(AsyncRequestCompleted(expectedResult)).toEqual({
        kind: AsyncRequestKinds.Completed,
        result: expectedResult,
      });
    });
  });
});
