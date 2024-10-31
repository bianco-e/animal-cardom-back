import Animal from './Animal'
import Habitat from './Habitat'

export default interface CampaignLevel {
  id: number
  habitat_id: Habitat['id']
  level_required: number
  animal_id_reward: Animal['id']
  coins_reward: number
  pc_animals: number[]
}
