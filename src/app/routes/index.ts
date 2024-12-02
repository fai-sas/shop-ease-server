import express from 'express'
import { userRoutes } from '../modules/user/user.route'
import { authRoutes } from '../modules/auth/auth.route'
import { categoryRoutes } from '../modules/category/category.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/categories',
    route: categoryRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
