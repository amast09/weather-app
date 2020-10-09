import express, { RequestHandler } from "express";
import Joi from "joi";
import validateObject, { ValidationResultKind } from "../helpers/joiValidation";
import { BAD_REQUEST, FAILED_DEPENDENCY } from "http-status";
import {
  FailedResponse,
  SuccessfulResponse,
} from "../../shared/types/ApiResponse";
import openWeatherApi from "../externalApis/openWeatherApi";
import locationStringToQuery from "../helpers/locationStringToQuery";
import environment from "../environment";
import { CurrentWeatherConditions } from "../../shared/types/OpenWeatherResponses";

const weatherRouter = express.Router();

const getWeatherQuerySchema: Joi.Schema = Joi.object({
  location: Joi.string().required(),
});

interface GetWeatherQuery {
  readonly location: string;
}

const getWeather: RequestHandler = async (req, res) => {
  const queryValidationResult = validateObject<GetWeatherQuery>(
    getWeatherQuerySchema,
    req.query
  );

  switch (queryValidationResult.result) {
    case ValidationResultKind.Invalid:
      const failedResponse: FailedResponse = {
        errors: queryValidationResult.errors,
      };
      return res.status(BAD_REQUEST).json(failedResponse);
    case ValidationResultKind.Valid:
      try {
        const currentWeatherConditions = await openWeatherApi.getCurrentWeather(
          environment.openWeatherApiKey,
          locationStringToQuery(queryValidationResult.value.location)
        );
        const successfulResponse: SuccessfulResponse<CurrentWeatherConditions> = {
          data: currentWeatherConditions,
        };
        return res.status(200).json(successfulResponse);
      } catch (_) {
        return res.status(FAILED_DEPENDENCY).send();
      }
  }
};

weatherRouter.get("^/$", getWeather);

export default weatherRouter;
