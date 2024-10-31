import { Request, Response } from 'express'
import User from '../models/User'
import { respondError } from '../utils/defaultResponses'
import jwt from 'jsonwebtoken'
import { getBearer } from '../utils'
import knex from '../index'
import { ERROR_CODES } from '../utils/constants'
import { createToken } from './utils'

const JWT_SECRET = process.env.JWT_SECRET

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    const { email } = req.body
    try {
      if (!JWT_SECRET) throw new Error('Internal error')
      if (!email) return respondError(res, `Missing params`, null, ERROR_CODES.BAD_REQUEST)
      const user = await knex<User>('users').where('email', email).first()
      if (!user) return respondError(res, `Not able to log in user`, null, ERROR_CODES.UNAUTHORIZED)
      const token = createToken({ email: user.email, role_id: user.role_id })
      res.status(200).send({
        token,
        user
      })
    } catch (e) {
      respondError(res, `Error logging user: ${email}`, JSON.stringify(e))
    }
  }

  static async checkToken(req: Request, res: Response): Promise<void> {
    try {
      if (!JWT_SECRET) throw new Error('Internal error')
      const token = getBearer(req.headers.authorization)
      if (!token) return respondError(res, `Token does not exist`, null, ERROR_CODES.UNAUTHORIZED)
      jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) return respondError(res, `Invalid token`, null, ERROR_CODES.UNAUTHORIZED)
        res.status(200).send({
          expires: decoded.exp,
          is_valid: true
        })
      })
    } catch (e) {
      respondError(res, `Error checking user token`, JSON.stringify(e))
    }
  }
}
