import { Request, Response } from 'express'
import { AnimalsController } from './Animals.controller'
import { PlantsController } from './Plants.controller'
import { HabitatsController } from './Habitats.controller'
import { respondError } from '../utils/defaultResponses'

export class GamesController {
  static async random(req: Request, res: Response) {
    try {
      const animals = await AnimalsController.getRandomAnimals(req, res)
      const plants = await PlantsController.getRandomPlants(req, res)
      const habitats = await HabitatsController.getRandomHabitats(req, res)
      const habitat = habitats[0]

      res.status(200).send({
        habitat,
        user: {
          animals: animals.slice(0, 5),
          plants: plants.slice(0, 3)
        },
        pc: {
          animals: animals.slice(5),
          plants: plants.slice(3)
        }
      })
    } catch (e) {
      respondError(res, 'Error getting random game', JSON.stringify(e))
    }
  }
}
