import { Router } from 'express'
import { CampaignsController } from '../controllers/Campaigns.controller'

const campaignsRouter: Router = Router()

campaignsRouter.get('/', CampaignsController.getAllCampaigns)
campaignsRouter.get('/:id', CampaignsController.getCampaignById)
campaignsRouter.post('/', CampaignsController.createCampaign)

export default campaignsRouter
