export default interface Animal {
  id: number
  name: string
  scientific_name: string
  description: string
  species_id: number
  species_name: string
  habitat_id: number
  habitat_name: string
  attack: number
  life: number
  price: number
  created_at: string
  updated_at: string
  skill_name: string
  skill_description: string
  skill_type_id: number
  skill_use_type_id: number
  targeteable: boolean
  bleeding: boolean
  missing_chance: number
}

export interface AnimalInput {
  name: string
  scientific_name: string
  description: string
  species_id: number
  habitat_id: number
  attack: number
  life: number
  price: number
  skill_name: string
  skill_description: string
  skill_type_id: number
  skill_use_type_id: number
  created_at: string
  targeteable: boolean
  bleeding: boolean
  missing_chance: number
}