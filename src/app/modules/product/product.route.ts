import express from 'express'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'
import { ProductControllers } from './product.controller'

const router = express.Router()

router.post(
  '/',
  auth(UserRole.ADMIN, UserRole.VENDOR),
  ProductControllers.createProduct
)

router.get('/', ProductControllers.getAllProducts)

router.get('/:productId', ProductControllers.getSingleProduct)

export const productRoutes = router
