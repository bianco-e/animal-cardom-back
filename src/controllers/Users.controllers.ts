import { Request, Response } from 'express'
import User from '../models/User'
import { ERROR_CODES } from '../utils/constants'
import { respondError } from '../utils/defaultResponses'
import knex from '..'

export class UsersController {
  static async getUser(req: Request, res: Response): Promise<void> {
    const { email } = req.body
    try {
      const user = await knex<User>('users').where('email', email).first()
      if (!user) return respondError(res, `User not found`, null, ERROR_CODES.NOT_FOUND)
      res.json(user)
    } catch (e) {
      respondError(res, `Error getting user: ${email}`, JSON.stringify(e))
    }
  }
}
