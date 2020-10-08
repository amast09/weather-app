import Joi, { ValidationErrorItem } from "joi";

export enum ValidationResultKind {
  Valid = "Valid",
  Invalid = "Invalid",
}

interface InvalidResult {
  readonly result: ValidationResultKind.Invalid;
  readonly errors: ValidationErrorItem[];
}

interface ValidResult<T> {
  readonly result: ValidationResultKind.Valid;
  readonly value: T;
}

export type ValidationResult<T> = InvalidResult | ValidResult<T>;

function validateObject<T>(
  schema: Joi.Schema,
  objectToValidate: any
): ValidationResult<T> {
  const { error }: Joi.ValidationResult = schema.validate(objectToValidate);

  if (error) {
    return { result: ValidationResultKind.Invalid, errors: error.details };
  } else {
    return { result: ValidationResultKind.Valid, value: objectToValidate };
  }
}

export default validateObject;
