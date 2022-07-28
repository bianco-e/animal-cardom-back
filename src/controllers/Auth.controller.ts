import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import { IUser } from "../interfaces";
import User from "../models/User";
import { defaultErrorResponse, responseHandler } from "../utils/defaultResponses";
import jwt from "jsonwebtoken";
import { getBearer } from "../utils";

const JWT_SECRET = process.env.JWT_SECRET;

export class AuthController {
  static async login(req: Request, res: Response) {
    if (!JWT_SECRET) return;
    const { auth_id, email } = req.body;
    if (!auth_id || !email)
      return defaultErrorResponse(res, "missing_params", "No params received");
    User.findOne({ auth_id, email }, (err: CallbackError, user: IUser | null) => {
      if (!user) return defaultErrorResponse(res, "no_user", "User does not match db");
      const token = jwt.sign({ email, role: user.role }, JWT_SECRET, {
        expiresIn: 21600, //6h
      });
      responseHandler(
        res,
        err,
        { token, user },
        "User does not match db",
        "Received values do not match our db"
      );
    });
  }

  static async checkToken(req: Request, res: Response) {
    if (!JWT_SECRET) return;
    const token = getBearer(req.headers.authorization);
    if (!token) return res.status(401).send({ error: "Unauthorized - NT" });
    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err) return res.status(401).send({ ...err });
      res.json({
        expires: decoded.exp,
        is_valid: true,
      });
    });
  }
}
