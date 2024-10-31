import { Request, Response } from 'express'
import User, { GoogleUser } from '../models/User'
import { ERROR_CODES, REGULAR_USER_ROLE_ID } from '../utils/constants'
import { respondError } from '../utils/defaultResponses'
import { v4 as uuidv4 } from 'uuid'
import knex from '..'
import { createToken } from './utils'

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

  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body.user)
      const { sub, picture, email, given_name, family_name } = req.body.user as GoogleUser
      const role_id = REGULAR_USER_ROLE_ID
      const token = createToken({ email, role_id })
      const [createdUser] = await knex<User>('users').returning('*').insert({
        id: uuidv4(),
        first_name: given_name,
        last_name: family_name,
        email,
        profile_img: picture,
        google_id: sub,
        role_id,
        created_at: new Date().toISOString()
      })
      res.status(201).send({ user: createdUser, token })
    } catch (e) {
      respondError(res, `Error creating user`, JSON.stringify(e))
    }
  }
}
