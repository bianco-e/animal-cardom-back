import { Router } from 'express'
import { SkillTypesController } from '../controllers/SkillTypes.controller'

const skillTypesRouter: Router = Router()

skillTypesRouter.get('/', SkillTypesController.getAllSkillTypes)
skillTypesRouter.get('/:id', SkillTypesController.getSkillTypeById)

export default skillTypesRouter
