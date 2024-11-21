import { Router } from 'express'
import { SpeciesController } from '../controllers/Species.controller'

const speciesRouter: Router = Router()

speciesRouter.get('/', SpeciesController.getAllSpecies)
speciesRouter.get('/:id', SpeciesController.getSpeciesById)

export default speciesRouter
