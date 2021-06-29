import { Response } from "express";

export const defaultOkResponse = (res: Response, message: string | object) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send(message);
  res.end();
};
export const defaultErrorResponse = (
  res: Response,
  message: string,
  error: string
) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(400).send({ message, error });
  res.end();
};
