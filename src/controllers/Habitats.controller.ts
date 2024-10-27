import { Request, Response } from 'express'
import { respondError } from '../utils/defaultResponses'
import knex from '..'
import { ERROR_CODES } from '../utils/constants'
import Habitat, { HabitatInput } from '../models/Habitat'

export class HabitatsController {
  static async getAllHabitats(req: Request, res: Response): Promise<void> {
    const { sort_by, order, limit } = req.query
    try {
      const habitats = await knex<Habitat>('habitats')
        .modify(queryBuilder => {
          if (limit) {
            queryBuilder.limit(parseInt(limit as string, 10))
          }
        })
        .orderBy(sort_by ? (sort_by as string) : 'name', order ? (order as string) : 'asc')
      res.json(habitats)
    } catch (e) {
      respondError(res, 'Error getting habitats', JSON.stringify(e))
    }
  }

  static async getHabitatById(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    try {
      const habitat = await knex<Habitat>('habitats').where('id', id).first()
      res.json(habitat)
    } catch (e) {
      respondError(res, `Error getting habitat with id ${id}`, JSON.stringify(e))
    }
  }

  static async getRandomHabitats(req: Request, res: Response, limit: number = 1): Promise<Habitat[]> {
    try {
      const habitats = await knex<Habitat>('habitats').select('*').orderByRaw('RANDOM()').limit(limit)
      return habitats
    } catch (e) {
      respondError(res, `Error getting random habitat`, JSON.stringify(e))
      return Promise.reject()
    }
  }

  static async createHabitat(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, color } = req.body
      const newHabitat: HabitatInput = {
        name,
        description,
        color
      }
      if (Object.values(newHabitat).some(value => value === null || value === undefined)) {
        respondError(res, 'Bad request - creating habitat, missing fields', null, ERROR_CODES.BAD_REQUEST)
      }
      return await knex('habitats').insert(newHabitat)
    } catch (e) {
      respondError(res, 'Error creating habitat', JSON.stringify(e))
    }
  }
}
