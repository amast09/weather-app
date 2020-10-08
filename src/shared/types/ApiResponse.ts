import { ValidationErrorItem } from "joi";

export interface SuccessfulResponse<T> {
  readonly data: T;
}

export interface FailedResponse {
  readonly errors: ValidationErrorItem[];
}
