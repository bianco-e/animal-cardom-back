import Animal from './Animal'
import Habitat from './Habitat'
import Plant from './Plant'

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
