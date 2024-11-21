import { Request, Response } from 'express'
import { respondError } from '../utils/defaultResponses'
import knex from '..'
import { ERROR_CODES } from '../utils/constants'
import Campaign from '../models/Campaign'
import Animal from '../models/Animal'
import CampaignAnimal from '../models/CampaignAnimal'
import { AnimalsController } from './Animals.controller'

export class CampaignAnimalsController {
  static async addCampaignAnimal(req: Request, res: Response): Promise<void> {
    const { animal_id, campaign_id } = req.body
    try {
      const campaign = await knex<Campaign>('campaigns').where('id', campaign_id).first()
      if (!campaign)
        return respondError(res, `Campaign with id ${campaign_id} does not exist`, null, ERROR_CODES.NOT_FOUND)
      const animal = await knex<Animal>('animals').where('id', animal_id).first()
      if (!animal) return respondError(res, `Animal with id ${animal_id} does not exist`, null, ERROR_CODES.NOT_FOUND)
      const { price } = animal
      const { coins } = campaign
      if (coins < price) {
        return respondError(res, `Not enough coins to buy animal with id ${animal_id}`, null, ERROR_CODES.BAD_REQUEST)
      }
      const coinsAfterPurchase = coins - price
      // TODO: SIMPLIFY THIS OR USE A TRANSACTION
      await knex('campaign_animals').insert({
        campaign_id,
        animal_id,
        is_in_hand: false
      })
      await knex('campaigns').where('id', campaign_id).update({
        coins: coinsAfterPurchase
      })
      res.status(200).send({ coins: coinsAfterPurchase, animal })
    } catch (e) {
      respondError(res, `Error adding animal ${animal_id} to campaign with id ${campaign_id}`, JSON.stringify(e))
    }
  }

  static async removeCampaignAnimal(req: Request, res: Response): Promise<void> {
    const { animal_id, campaign_id, sell_price } = req.body
    try {
      const campaign = await knex<Campaign>('campaigns').where('id', campaign_id).first()
      if (!campaign)
        return respondError(res, `Campaign with id ${campaign_id} does not exist`, null, ERROR_CODES.NOT_FOUND)
      const campaignAnimal = await knex<CampaignAnimal>('campaign_animals')
        .where('animal_id', animal_id)
        .andWhere('campaign_id', campaign_id)
        .first()
      if (!campaignAnimal)
        return respondError(res, `Animal with id ${animal_id} is not owned`, null, ERROR_CODES.NOT_FOUND)
      if (campaignAnimal.is_in_hand)
        return respondError(
          res,
          `Animal with id ${animal_id} cannot be sold because is in hand`,
          null,
          ERROR_CODES.FORBIDDEN
        )
      const [currentCampaignAnimalsCount] = await knex('campaign_animals')
        .where('campaign_id', campaign_id)
        .count({ count: '*' })
      if (Number(currentCampaignAnimalsCount.count) <= 5)
        return respondError(
          res,
          `Animal with id ${animal_id} cannot be sold. Not enough animals owned`,
          null,
          ERROR_CODES.FORBIDDEN
        )
      const { coins } = campaign
      const coinsAfterSale = coins + sell_price
      // TODO: SIMPLIFY THIS OR USE A TRANSACTION
      await knex('campaign_animals').where('animal_id', animal_id).andWhere('campaign_id', campaign_id).delete()
      await knex('campaigns').where('id', campaign_id).update({
        coins: coinsAfterSale
      })
      res.status(200).send({ coins: coinsAfterSale })
    } catch (e) {
      respondError(res, `Error adding animal ${animal_id} to campaign with id ${campaign_id}`, JSON.stringify(e))
    }
  }

  static async updateCampaignHand(req: Request, res: Response): Promise<void> {
    const { old_hand, new_hand, campaign_id } = req.body
    try {
      const newAnimal = new_hand.find((animalId: Animal['id']) => !old_hand.includes(animalId))
      const removedAnimal = old_hand.find((animalId: Animal['id']) => !new_hand.includes(animalId))
      if (!newAnimal || !removedAnimal) return respondError(res, `Invalid params`, null, ERROR_CODES.BAD_REQUEST)
      const campaignAnimals = await knex<CampaignAnimal>('campaign_animals').where('campaign_id', campaign_id)
      if (!campaignAnimals.length)
        return respondError(res, `Campaign with id ${campaign_id} does not exist`, null, ERROR_CODES.NOT_FOUND)
      const handAnimals = await AnimalsController.getAnimalsByIds(new_hand)

      // TODO: SIMPLIFY THIS OR USE A TRANSACTION
      await knex('campaign_animals').where('animal_id', removedAnimal).andWhere('campaign_id', campaign_id).update({
        is_in_hand: false
      })
      await knex('campaign_animals').where('animal_id', newAnimal).andWhere('campaign_id', campaign_id).update({
        is_in_hand: true
      })
      res.status(200).send({ new_hand: handAnimals })
    } catch (e) {
      respondError(res, `Error updating hand for campaign with id ${campaign_id}`, JSON.stringify(e))
    }
  }
}
