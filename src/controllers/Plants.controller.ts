import { Request, Response } from 'express'
import { respondError } from '../utils/defaultResponses'
import knex from '..'
import Plant, { PlantInput } from '../models/Plant'
import { ERROR_CODES } from '../utils/constants'

export class PlantsController {
  static async getAllPlants(req: Request, res: Response): Promise<void> {
    const { name, use_type_id, sort_by, order, limit } = req.query
    try {
      const plants = await knex<Plant>('plants')
        .modify(queryBuilder => {
          if (name) {
            queryBuilder.whereILike('name', `%${name}%`)
          }
          if (use_type_id) {
            queryBuilder.where('use_type_id', use_type_id)
          }
          if (limit) {
            queryBuilder.limit(parseInt(limit as string, 10))
          }
        })
        .orderBy(sort_by ? (sort_by as string) : 'name', order ? (order as string) : 'asc')
      res.json(plants)
    } catch (e) {
      respondError(res, 'Error getting plants', JSON.stringify(e))
    }
  }

  static async getRandomPlants(req: Request, res: Response, limit: number = 6): Promise<Plant[]> {
    try {
      const plants = await knex<Plant>('plants').select('*').orderByRaw('RANDOM()').limit(limit)
      return plants
    } catch (e) {
      respondError(res, `Error getting ${limit} random plants`, JSON.stringify(e))
      return Promise.reject()
    }
  }

  static async getPlantById(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    try {
      const plant = await knex<Plant>('plants').where('id', id).first()
      res.json(plant)
    } catch (e) {
      respondError(res, `Error getting plant with id ${id}`, JSON.stringify(e))
    }
  }

  static async createPlant(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, use_type_id } = req.body
      const newPlant: PlantInput = {
        name,
        description,
        use_type_id: parseInt(use_type_id, 10)
      }
      if (Object.values(newPlant).some(value => value === null || value === undefined)) {
        respondError(res, 'Bad request - creating plant, missing fields', null, ERROR_CODES.BAD_REQUEST)
      }
      return await knex('plants').insert(newPlant)
    } catch (e) {
      respondError(res, 'Error creating plant', JSON.stringify(e))
    }
  }
}
