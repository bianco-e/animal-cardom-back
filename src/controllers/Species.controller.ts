import { Request, Response } from 'express'
import { respondError } from '../utils/defaultResponses'
import knex from '..'
import Species from '../models/Species'

export class SpeciesController {
  static async getAllSpecies(req: Request, res: Response): Promise<void> {
    const { sort_by, order, limit } = req.query
    try {
      const species = await knex<Species>('species')
        .modify(queryBuilder => {
          if (limit) {
            queryBuilder.limit(parseInt(limit as string, 10))
          }
        })
        .orderBy(sort_by ? (sort_by as string) : 'name', order ? (order as string) : 'asc')
      res.json(species)
    } catch (e) {
      respondError(res, 'Error getting species', JSON.stringify(e))
    }
  }

  static async getSpeciesById(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    try {
      const species = await knex<Species>('species').where('id', id).first()
      res.json(species)
    } catch (e) {
      respondError(res, `Error getting species with id ${id}`, JSON.stringify(e))
    }
  }
}
