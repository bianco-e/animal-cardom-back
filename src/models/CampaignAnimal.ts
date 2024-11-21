import Animal from "./Animal"
import Campaign from "./Campaign"

export default interface CampaignAnimal {
    id: number
    campaign_id: Campaign['id']
    animal_id: Animal['id']
    is_in_hand: boolean
}