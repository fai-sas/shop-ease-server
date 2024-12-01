import express, { NextFunction, Request, Response } from 'express'
import { AuthController } from './auth.controller'

const router = express.Router()

router.post('/create-customer', AuthController.createCustomer)

router.post('/create-vendor', AuthController.createVendor)

router.post('/login', AuthController.loginUser)

export const authRoutes = router
