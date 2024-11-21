import Animal from './Animal'
import Habitat from './Habitat'
import Plant from './Plant'
import User from './User'

export default interface Game {
  habitat: Habitat
  user: {
    plants: Plant[]
    animals: Animal[]
  }
  pc: {
    plants: Plant[]
    animals: Animal[]
  }
}

export interface FinishedGame {
  id: number
  user_id: User['id'] | null
  habitat_id: Habitat['id']
  habitat_name: Habitat['name']
  user_won: boolean
  pc_used_animals: { id: Animal['id']; name: Animal['name']; finished_game: boolean }[]
  user_used_animals: { id: Animal['id']; name: Animal['name']; finished_game: boolean }[]
  pc_used_plants: { id: Plant['id']; name: Plant['name']; finished_game: boolean }[]
  user_used_plants: { id: Plant['id']; name: Plant['name']; finished_game: boolean }[]
  created_at: string
}
