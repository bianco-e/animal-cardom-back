import { Response } from "express";
import { NativeError } from "mongoose";
import log from "../utils/logger";

export const defaultOkResponse = (res: Response, message: string | object) => {
  res.status(200).send(message);
  res.end();
};

export const defaultErrorResponse = (
  res: Response,
  error: string | NativeError,
  message?: string
) => {
  log.error(`${message ? `Message: ${message} | ` : ""}Error: ${error}`);
  res.status(400).send({ message, error });
  res.end();
};

export const responseHandler = (
  res: Response,
  err: NativeError | null,
  doc: any,
  errMsg: string,
  nullDocMsg?: string
) => {
  if (err) return defaultErrorResponse(res, err, errMsg);
  if (!doc && nullDocMsg) return defaultErrorResponse(res, nullDocMsg);
  return defaultOkResponse(res, doc);
};
