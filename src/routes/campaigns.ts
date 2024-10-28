import { Router } from 'express'
import { CampaignsController } from '../controllers/Campaigns.controller'
import { validateAdmin } from '../utils/middlewares'

const campaignsRouter: Router = Router()

campaignsRouter.get('/', CampaignsController.getAllCampaigns)
campaignsRouter.get('/:id', CampaignsController.getCampaignById)

export default campaignsRouter
