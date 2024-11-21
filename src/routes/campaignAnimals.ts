import { Router } from 'express'
import { CampaignAnimalsController } from '../controllers/CampaignAnimals.controller.ts'

const campaignAnimalsRouter: Router = Router()


campaignAnimalsRouter.post('/', CampaignAnimalsController.addCampaignAnimal)
campaignAnimalsRouter.delete('/', CampaignAnimalsController.removeCampaignAnimal)
campaignAnimalsRouter.put('/', CampaignAnimalsController.updateCampaignHand)

export default campaignAnimalsRouter
