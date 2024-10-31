import animalsRoutes from './animals'
import authRoutes from './auth'
import plantsRoutes from './plants'
import habitatsRoutes from './habitats'
import gamesRoutes from './games'
import campaignsRoutes from './campaigns'
import campaignAnimalsRoutes from './campaignAnimals'
import campaignLevelsRoutes from './campaignLevels'
import usersRoutes from './users'
import speciesRoutes from './species'
import skillTypesRoutes from './skillTypes'
import { Router } from 'express'

const router: Router = Router()
router.use('/animals', animalsRoutes)
router.use('/auth', authRoutes)
router.use('/plants', plantsRoutes)
router.use('/habitats', habitatsRoutes)
router.use('/games', gamesRoutes)
router.use('/campaigns', campaignsRoutes)
router.use('/campaign_animals', campaignAnimalsRoutes)
router.use('/campaign_levels', campaignLevelsRoutes)
router.use('/users', usersRoutes)
router.use('/species', speciesRoutes)
router.use('/skill_types', skillTypesRoutes)

export default router
