import express from 'express'
import { userRoutes } from '../modules/user/user.route'
import { authRoutes } from '../modules/auth/auth.route'
import { categoryRoutes } from '../modules/category/category.route'
import { productRoutes } from '../modules/product/product.route'
import { cartRoutes } from '../modules/cart/cart.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/products',
    route: productRoutes,
  },
  {
    path: '/carts',
    route: cartRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
