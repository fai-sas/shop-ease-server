import express from 'express'
import { AuthController } from './auth.controller'

const router = express.Router()

router.post('/create-customer', AuthController.createCustomer)

router.post('/create-vendor', AuthController.createVendor)

router.post('/login', AuthController.loginUser)

router.post('/refresh-token', AuthController.refreshToken)

router.post('/change-password', AuthController.changePassword)

router.post('/forgot-password', AuthController.forgotPassword)

router.post('/reset-password', AuthController.resetPassword)

export const authRoutes = router
