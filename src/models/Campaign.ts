import Animal from './Animal'

export default interface Campaign {
  id: string
  user_id: string
  xp: number
  coins: number
  created_at: string
  owned_animals: CampaignAnimal[]
}

interface CampaignAnimal extends Animal {
  is_in_hand: boolean
}
