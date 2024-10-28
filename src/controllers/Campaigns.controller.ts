import { Request, Response } from 'express'
import { respondError } from '../utils/defaultResponses'
import knex from '..'
import { ERROR_CODES } from '../utils/constants'
import Campaign from '../models/Campaign';

const baseQuery = () =>
  knex<Campaign>('campaigns')
    .select(
      'campaigns.*',
      knex.raw(`
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', animals.id,
              'name', animals.name,
              'species_id', animals.species_id,
              'attack', animals.attack,
              'life', animals.life,
              'scientific_name', animals.scientific_name,
              'description', animals.description,
              'habitat_id', animals.habitat_id,
              'price', animals.price,
              'skill_name', animals.skill_name,
              'skill_description', animals.skill_description,
              'skill_type_id', animals.skill_type_id,
              'skill_use_type_id', animals.skill_use_type_id,
              'targeteable', animals.targeteable,
              'bleeding', animals.bleeding,
              'missing_chance', animals.missing_chance,
              'species_name', species.name,
              'species_description', species.description,
              'species_icon', species.icon,
              'habitat_name', habitats.name,
              'is_in_hand', campaign_animals.is_in_hand
            )
          ) FILTER (WHERE animals.id IS NOT NULL), '[]'::json
        ) as owned_animals
      `)
    )
    .leftJoin('campaign_animals', 'campaign_animals.campaign_id', 'campaigns.id')
    .leftJoin('animals', 'animals.id', 'campaign_animals.animal_id')
    .leftJoin('species', 'animals.species_id', 'species.id')
    .leftJoin('habitats', 'animals.habitat_id', 'habitats.id')
    .groupBy('campaigns.id');

export class CampaignsController {
  static async getAllCampaigns(req: Request, res: Response): Promise<void> {
    const { user_id, sort_by, order, limit } = req.query
    if (!user_id) {
      respondError(res, 'Missing params to get campaign', null, ERROR_CODES.BAD_REQUEST)
    }
    try {
      const campaigns = await baseQuery().where('campaigns.user_id', user_id)
        .modify(queryBuilder => {
          if (limit) {
            queryBuilder.limit(parseInt(limit as string, 10))
          }
        })
        .orderBy(sort_by ? (sort_by as string) : 'xp', order ? (order as string) : 'asc')
      res.status(200).send(campaigns)
    } catch (e) {
      respondError(res, 'Error getting campaigns', JSON.stringify(e))
    }
  }

  static async getCampaignById(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    try {
      const campaign = await baseQuery()
        .where('campaigns.id', id)
        .first()
      res.status(200).send(campaign)
    } catch (e) {
      respondError(res, `Error getting campaign with id ${id}`, JSON.stringify(e))
    }
  }
}
