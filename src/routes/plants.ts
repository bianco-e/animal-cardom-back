import { Router } from 'express'
import { PlantsController } from '../controllers/Plants.controller'
import { validateAdmin } from '../utils/middlewares'

const plantsRouter: Router = Router()

plantsRouter.get('/', PlantsController.getAllPlants)
plantsRouter.get('/:id', PlantsController.getPlantById)

//ADMIN ROUTES
plantsRouter.use(validateAdmin)
plantsRouter.post('/', PlantsController.createPlant)

export default plantsRouter
