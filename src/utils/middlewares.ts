import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { getBearer } from ".";

const JWT_SECRET = process.env.JWT_SECRET;

const tokenHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
  callback?: (decoded: any) => void
) => {
  const token = getBearer(req.headers.authorization);
  if (!token) res.status(401).send({ error: "Unauthorized - NT" });
  if (!JWT_SECRET) return res.status(500).send({ error: "Environment unset" });
  jwt.verify(token!, JWT_SECRET, (err: VerifyErrors | null, decoded: any) => {
    if (err) return res.status(401).send(err);
    if (callback) return callback(decoded);
    next();
  });
};

export const validateToken = (req: Request, res: Response, next: NextFunction) =>
  tokenHandler(req, res, next);

export const validateAdmin = (req: Request, res: Response, next: NextFunction) => {
  const callback = (decoded: any) => {
    if (decoded.role !== "ADMIN")
      return res.status(401).send({ error: "User does not have required permissions" });
    next();
  };
  return tokenHandler(req, res, next, callback);
};
