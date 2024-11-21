import { Router } from 'express'
import { CampaignLevelsController } from '../controllers/CampaignLevels.controller'

const campaignLevelsRouter: Router = Router()

campaignLevelsRouter.get('/', CampaignLevelsController.getAllCampaignLevels)
campaignLevelsRouter.get('/:id', CampaignLevelsController.getCampaignLevelById)

export default campaignLevelsRouter
