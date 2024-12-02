import express from 'express'
import { CategoryControllers } from './category.controller'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'

const router = express.Router()

router.post('/', auth(UserRole.ADMIN), CategoryControllers.createCategory)

router.get('/', CategoryControllers.getAllCategories)

router.get('/:categoryId', CategoryControllers.getSingleCategory)

router.put('/:categoryId', CategoryControllers.updateCategory)

export const categoryRoutes = router
