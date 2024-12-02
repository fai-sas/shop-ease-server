import express, { NextFunction, Request, Response } from 'express'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'
import { CartControllers } from './cart.controller'

const router = express.Router()

router.post('/', auth(UserRole.USER), CartControllers.createCart)

router.get('/', CartControllers.getAllCarts)

router.get('/:cartId', CartControllers.getSingleCart)

export const cartRoutes = router
