import { Request, Response } from 'express'
import { respondError } from '../utils/defaultResponses'
import knex from '..'
import CampaignLevel from '../models/CampaignLevel'

const baseQuery = () =>
    knex<CampaignLevel>('campaign_levels')
      .select(
        'campaign_levels.*',
        'habitats.name as habitat_name'
      )
      .from('campaign_levels')
      .leftJoin('habitats', 'campaign_levels.habitat_id', 'habitats.id')

export class CampaignLevelsController {
  static async getAllCampaignLevels(req: Request, res: Response): Promise<void> {
    const { habitat_id, animal_id_reward } = req.query
    try {
      const campaignLevels = await baseQuery().modify(queryBuilder => {
        if (habitat_id) {
          queryBuilder.where('habitat_id', habitat_id)
        }
        if (animal_id_reward) {
          queryBuilder.where('animal_id_reward', animal_id_reward)
        }
      })
      res.json(campaignLevels)
    } catch (e) {
      respondError(res, 'Error getting campaign levels', JSON.stringify(e))
    }
  }

  static async getCampaignLevelByLevel(level: number): Promise<CampaignLevel> {
    try {
      const campaignLevel = await baseQuery().where('campaign_levels.level_required', level).first()
      return campaignLevel
    } catch (e) {
      return Promise.reject(e)
    }
  }

  static async getCampaignLevelById(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    try {
      const campaignLevel = await baseQuery().where('id', id).first()
      res.json(campaignLevel)
    } catch (e) {
      respondError(res, `Error getting campaign level with id ${id}`, JSON.stringify(e))
    }
  }
}
