import animalsRoutes from './animals'
import authRoutes from './auth'
import plantsRoutes from './plants'
import habitatsRoutes from './habitats'
import gamesRoutes from './games'
import usersRouter from './users'
import speciesRouter from './species'
import skillTypesRouter from './skillTypes'
import { Router } from 'express'

const router: Router = Router()
router.use('/animals', animalsRoutes)
router.use('/auth', authRoutes)
router.use('/plants', plantsRoutes)
router.use('/habitats', habitatsRoutes)
router.use('/games', gamesRoutes)
router.use('/users', usersRouter)
router.use('/species', speciesRouter)
router.use('/skill_types', skillTypesRouter)

export default router
