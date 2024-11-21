export default interface Plant {
  id: number
  name: string
  description: string
  use_type_id: number
}

export interface PlantInput {
  name: string
  description: string
  use_type_id: number
}