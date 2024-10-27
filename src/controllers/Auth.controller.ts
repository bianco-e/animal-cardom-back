import { Request, Response } from 'express'
import User from '../models/User'
import { respondError } from '../utils/defaultResponses'
import jwt from 'jsonwebtoken'
import { getBearer } from '../utils'
import knex from 'knex'
import { ERROR_CODES } from '../utils/constants'

const JWT_SECRET = process.env.JWT_SECRET

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    const { auth_id, email } = req.body
    try {
      if (!JWT_SECRET) throw new Error('Internal error')
      if (!auth_id || !email) return respondError(res, `Missing params`, null, ERROR_CODES.BAD_REQUEST)
      /*       const user: User = await knex<User>('users').where('email', email).andWhere('google_id', auth_id).first()
    console.log('user', user)
      if (!user) return respondError(res, `Not able to log in user`, null, ERROR_CODES.UNAUTHORIZED) */
      const token = jwt.sign({ email: 'bianco.emiliozzi@gmail.com', role_id: 1 }, JWT_SECRET, {
        expiresIn: 172800 //2d
      })
      res.status(200).send({
        token,
        user: {
          first_name: 'Bianco',
          last_name: 'Emiliozzi',
          profile_img:
            'https://lh3.googleusercontent.com/a/ACg8ocLgr_C_suVFDY5kKn4nZWtC1xypsMhsBAxzc1B1ieNasNbMLPJA=s96-c',
          email: 'bianco.emiliozzi@gmail.com',
          sub: 'google-oauth2|117425474712692107084'
        }
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
