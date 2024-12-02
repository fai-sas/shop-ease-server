import express, { NextFunction, Request, Response } from 'express'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'
import { UserControllers } from './user.controller'

const router = express.Router()

// router.get('/', auth(UserRole.ADMIN), UserControllers.getAllUsers)

router.get('/', UserControllers.getAllUsers)

router.get('/users/:userId', UserControllers.getSingleUser)

router.get('/vendors', UserControllers.getAllVendors)

router.get('/vendors/:vendorId', UserControllers.getSingleVendor)

router.delete('/users/:userId', UserControllers.deleteUser)

export const userRoutes = router
