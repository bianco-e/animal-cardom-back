import { Request, Response } from 'express'
import { animalsBaseQuery, AnimalsController } from './Animals.controller'
import { PlantsController } from './Plants.controller'
import { HabitatsController } from './Habitats.controller'
import { respondError } from '../utils/defaultResponses'
import Game, { FinishedGame } from '../models/Game'
import { CampaignLevelsController } from './CampaignLevels.controller'
import { CampaignsController } from './Campaigns.controller'
import { ERROR_CODES } from '../utils/constants'
import knex from '..'
import CampaignLevel from '../models/CampaignLevel'
import Campaign from '../models/Campaign'

export class GamesController {
  static async random(req: Request, res: Response): Promise<void> {
    try {
      const animals = await AnimalsController.getRandomAnimals(req, res)
      const plants = await PlantsController.getRandomPlants(req, res)
      const habitats = await HabitatsController.getRandomHabitats(req, res)
      const habitat = habitats[0]

      const newGame: Game = {
        habitat,
        user: {
          animals: animals.slice(0, 5),
          plants: plants.slice(0, 3)
        },
        pc: {
          animals: animals.slice(5),
          plants: plants.slice(3)
        }
      }

      res.status(200).send(newGame)
    } catch (e) {
      respondError(res, 'Error getting random game', JSON.stringify(e))
    }
  }

  static async campaign(req: Request, res: Response): Promise<void> {
    const { level, user_id } = req.body
    try {
      const userCampaign = await CampaignsController.getCampaignByUserId(user_id)
      if (!userCampaign) return respondError(res, 'Campaign not found', null, ERROR_CODES.NOT_FOUND)
      if (userCampaign.level < level)
        return respondError(res, `Campaign level ${level} cannot be played by user`, null, ERROR_CODES.BAD_REQUEST)
      const campaignLevel = await CampaignLevelsController.getCampaignLevelByLevel(level)
      const userAnimals = userCampaign.owned_animals.filter(animal => animal.is_in_hand)
      const pcHandIds = campaignLevel.pc_animal_ids
        .filter(pcAnimalId => !userAnimals.find(userAnimal => userAnimal.id === pcAnimalId))
        .slice(0, 5)
      const pcAnimals = await AnimalsController.getAnimalsByIds(pcHandIds)
      const plants = await PlantsController.getRandomPlants(req, res)
      const habitat = await HabitatsController.getHabitatById(campaignLevel.habitat_id)

      const newGame: Game = {
        habitat,
        user: {
          animals: userAnimals,
          plants: plants.slice(0, 3)
        },
        pc: {
          animals: pcAnimals,
          plants: plants.slice(3)
        }
      }

      res.status(200).send(newGame)
    } catch (e) {
      respondError(res, `Error getting campaign game for level ${level}`, JSON.stringify(e))
    }
  }

  static async saveGame(req: Request, res: Response): Promise<void> {
    const { user_id, game, level } = req.body
    try {
      // TODO: SIMPLIFY THIS OR USE A TRANSACTION
      await knex<FinishedGame>('finished_games').insert({
        user_id,
        user_won: game.user_won,
        habitat_id: game.habitat_id,
        habitat_name: game.habitat_name,
        pc_used_animals: game.pc_used_animals,
        user_used_animals: game.user_used_animals,
        pc_used_plants: game.pc_used_plants,
        user_used_plants: game.user_used_plants,
        created_at: new Date().toISOString()
      })
      const campaignLevel = await knex<CampaignLevel>('campaign_levels').where('level_required', level).first()
      if (!campaignLevel)
        return respondError(res, `Campaign level ${level} cannot be retrieved`, null, ERROR_CODES.NOT_FOUND)
      const [updatedCampaign] = await knex('campaigns')
        .where('user_id', user_id)
        .increment({
          coins: campaignLevel.coins_reward,
          level: 1
        })
        .returning('*')
      if (!campaignLevel.animal_id_reward) {
        res.status(200).send({
          earned_animal: null,
          new_level: updatedCampaign.level,
          current_coins: updatedCampaign.coins,
          earned_coins: campaignLevel.coins_reward
        })
      } else {
        const earned_animal = animalsBaseQuery().where('animals.id', campaignLevel.animal_id_reward).first()
        res.status(200).send({
          earned_animal,
          new_level: updatedCampaign.level,
          current_coins: updatedCampaign.coins,
          earned_coins: campaignLevel.coins_reward
        })
      }
    } catch (e) {
      respondError(res, `Error saving game ${user_id ? `for user ${user_id}` : ''}`, JSON.stringify(e))
    }
  }

  static async getGamesHistory(req: Request, res: Response): Promise<void> {
    const { user_id } = req.params
    try {
      if (!user_id) return respondError(res, `Missing params`, null, ERROR_CODES.BAD_REQUEST)
      const last_games = await knex<FinishedGame>('finished_games').where('user_id', user_id)
      res.status(200).send({
        last_games
      })
    } catch (e) {
      respondError(res, `Error getting games history for user ${user_id}`, JSON.stringify(e))
    }
  }
}
