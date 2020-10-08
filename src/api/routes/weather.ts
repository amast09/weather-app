import { Request } from "express-serve-static-core";
import express, { RequestHandler } from "express";
import Joi from "joi";
import validateObject, { ValidationResultKind } from "../helpers/joiValidation";
import { BAD_REQUEST } from "http-status";
import { FailedResponse } from "../../shared/types/ApiResponse";

const weatherRouter = express.Router();

const getWeatherQuerySchema: Joi.Schema = Joi.object({
  location: Joi.string().required(),
});

const getWeather: RequestHandler = (req: Request, res) => {
  const queryValidationResult = validateObject(
    req.query,
    getWeatherQuerySchema
  );

  switch (queryValidationResult.result) {
    case ValidationResultKind.Invalid:
      const response: FailedResponse = { errors: queryValidationResult.errors };
      return res.status(BAD_REQUEST).json(response);
    case ValidationResultKind.Valid:
      return res.status(200).json({});
  }
};

weatherRouter.get("^/$", getWeather);

export default weatherRouter;
