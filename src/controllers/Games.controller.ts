import { Request, Response } from 'express'
import { AnimalsController } from './Animals.controller'
import { PlantsController } from './Plants.controller'
import { HabitatsController } from './Habitats.controller'
import { respondError } from '../utils/defaultResponses'
import Game from '../models/Game'
import { CampaignLevelsController } from './CampaignLevels.controller'

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
    const { level, user_animal_ids } = req.body
    try {
      const campaignLevel = await CampaignLevelsController.getCampaignLevelByLevel(level)
      console.log('campaignLevel', campaignLevel, user_animal_ids)
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
}
