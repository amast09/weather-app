import Joi from "joi";
import validateObject, {
  ValidationResult,
  ValidationResultKind,
} from "./joiValidation";

interface Foobar {
  readonly foobar: string;
}

const foobarSchema: Joi.Schema = Joi.object({
  foobar: Joi.string().required(),
});

describe("validateObject", () => {
  it("returns an invalid result when the object does not match the provided schema", () => {
    const expectedResponse: ValidationResult<Foobar> = {
      result: ValidationResultKind.Invalid,
      errors: [
        {
          context: {
            key: "foobar",
            label: "foobar",
          },
          message: '"foobar" is required',
          path: ["foobar"],
          type: "any.required",
        },
      ],
    };

    expect(validateObject(foobarSchema, {})).toEqual(expectedResponse);
  });

  it("returns a valid result when the object matches the provided schema", () => {
    const foobar: Foobar = { foobar: "foobar" };
    const expectedResponse: ValidationResult<Foobar> = {
      result: ValidationResultKind.Valid,
      value: foobar,
    };

    expect(validateObject(foobarSchema, foobar)).toEqual(expectedResponse);
  });
});
