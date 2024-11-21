import { Request, Response } from 'express'
import { respondError } from '../utils/defaultResponses'
import knex from '..'
import SkillType from '../models/SkillType'

export class SkillTypesController {
  static async getAllSkillTypes(req: Request, res: Response): Promise<void> {
    const { sort_by, order, limit } = req.query
    try {
      const skillTypes = await knex<SkillType>('skill_types')
        .modify(queryBuilder => {
          if (limit) {
            queryBuilder.limit(parseInt(limit as string, 10))
          }
        })
        .orderBy(sort_by ? (sort_by as string) : 'name', order ? (order as string) : 'asc')
      res.json(skillTypes)
    } catch (e) {
      respondError(res, 'Error getting skill types', JSON.stringify(e))
    }
  }

  static async getSkillTypeById(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    try {
      const skillType = await knex<SkillType>('skill_types').where('id', id).first()
      res.json(skillType)
    } catch (e) {
      respondError(res, `Error getting skill type with id ${id}`, JSON.stringify(e))
    }
  }
}
