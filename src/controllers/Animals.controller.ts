import type { Request, Response } from 'express'
import Animal, { AnimalInput } from '../models/Animal'
import knex from '../index'
import { respondError } from '../utils/defaultResponses'
import { ERROR_CODES } from '../utils/constants'
import { getAnimalsStatsByProperty } from './utils'

const baseQuery = () =>
  knex<Animal>('animals')
    .select(
      'animals.*',
      'species.name as species_name',
      'species.description as species_description',
      'species.icon as species_icon',
      'habitats.name as habitat_name'
    )
    .from('animals')
    .leftJoin('species', 'animals.species_id', 'species.id')
    .leftJoin('habitats', 'animals.habitat_id', 'habitats.id')

export class AnimalsController {
  static async getAllAnimals(req: Request, res: Response): Promise<void> {
    const { name, species_id, habitat_id, price, skill_use_type_id, skill_type_id, sort_by, order, limit } = req.query
    try {
      const animals = await baseQuery()
        .modify(queryBuilder => {
          if (name) {
            queryBuilder.whereILike('animals.name', `%${name}%`)
          }
          if (species_id) {
            queryBuilder.where('animals.species_id', species_id)
          }
          if (habitat_id) {
            queryBuilder.where('animals.habitat_id', habitat_id)
          }
          if (price) {
            queryBuilder.where('animals.price', price)
          }
          if (skill_type_id) {
            queryBuilder.where('animals.skill_type_id', skill_type_id)
          }
          if (skill_use_type_id) {
            queryBuilder.where('animals.skill_use_type_id', skill_use_type_id)
          }
          if (limit) {
            queryBuilder.limit(parseInt(limit as string, 10))
          }
        })
        .orderBy(sort_by ? (sort_by as string) : 'name', order ? (order as string) : 'asc')

      res.json(animals)
    } catch (e) {
      respondError(res, 'Error getting animals', JSON.stringify(e))
    }
  }

  static async getAllAnimalsStats(req: Request, res: Response): Promise<void> {
    try {
      const animals: Animal[] = await baseQuery()
      const animalsBySpecies = getAnimalsStatsByProperty(animals, 'species_id')
      const animalsByHabitat = getAnimalsStatsByProperty(animals, 'habitat_id')
      res.status(200).send({ count: animals.length, species: animalsBySpecies, habitat: animalsByHabitat })
    } catch (e) {
      respondError(res, 'Error getting animals stats', JSON.stringify(e))
    }
  }

  static async getRandomAnimals(req: Request, res: Response, limit: number = 10): Promise<Animal[]> {
    try {
      const animals: Animal[] = await baseQuery().orderByRaw('RANDOM()').limit(limit)
      return animals
    } catch (e) {
      respondError(res, `Error getting ${limit} random animals`, JSON.stringify(e))
      return Promise.reject()
    }
  }

  static async getAnimalById(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    try {
      const animal: Animal = await baseQuery().where('animals.id', id).first()
      res.json(animal)
    } catch (e) {
      respondError(res, `Error getting animal with id ${id}`, JSON.stringify(e))
    }
  }

  static async createAnimal(req: Request, res: Response): Promise<void> {
    try {
      const {
        name,
        scientific_name,
        description,
        species_id,
        habitat_id,
        attack,
        life,
        price,
        skill_name,
        skill_description,
        skill_type_id,
        skill_use_type_id,
        targeteable,
        bleeding,
        missing_chance
      } = req.body

      const newAnimal: AnimalInput = {
        name,
        scientific_name,
        description,
        species_id: parseInt(species_id, 10),
        habitat_id: parseInt(habitat_id, 10),
        attack: parseInt(attack, 10),
        life: parseInt(life, 10),
        price: parseInt(price, 10),
        created_at: new Date().toISOString(),
        skill_name,
        skill_description,
        skill_type_id: parseInt(skill_type_id, 10),
        skill_use_type_id: parseInt(skill_use_type_id, 10),
        targeteable,
        bleeding,
        missing_chance: parseInt(missing_chance, 10)
      }
      if (Object.values(newAnimal).some(value => value === null || value === undefined)) {
        respondError(res, 'Bad request - creating animal, missing fields', null, ERROR_CODES.BAD_REQUEST)
      }
      return await knex('animals').insert(newAnimal)
    } catch (e) {
      respondError(res, 'Error creating animal', JSON.stringify(e))
    }
  }
}
