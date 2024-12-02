import { CartItem } from '@prisma/client'
import { TAuthUser } from '../../interface/common'
import prisma from '../../utils/prisma'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const createCartIntoDb = async (user: TAuthUser, payload: CartItem) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  })

  const product = await prisma.product.findUniqueOrThrow({
    where: {
      productId: payload.productId,
    },
  })

  const existingCartItem = await prisma.cartItem.findFirst({
    where: {
      productId: payload.productId,
      customerId: user?.email,
    },
  })

  if (existingCartItem) {
    const newQuantity = existingCartItem.quantity + (payload.quantity || 1)

    if (newQuantity > product.inventory) {
      throw new Error('Exceeds available stock')
    }

    const updatedCartItem = await prisma.cartItem.update({
      where: {
        cartItemId: existingCartItem.cartItemId,
      },
      data: {
        quantity: newQuantity,
        totalPrice: product.price * newQuantity,
        updatedAt: new Date(),
      },
    })

    const grandTotal = await prisma.cartItem.aggregate({
      where: {
        customerId: user?.email,
      },
      _sum: {
        totalPrice: true,
      },
    })

    return {
      updatedCartItem,
      grandTotalPrice: grandTotal._sum.totalPrice || 0,
    }
  }

  const initialQuantity = payload.quantity || 1

  if (initialQuantity > product.inventory) {
    throw new Error('Exceeds available stock')
  }

  const newCartItem = await prisma.cartItem.create({
    data: {
      ...payload,
      customerId: user?.email,
      quantity: initialQuantity,
      totalPrice: product.price * initialQuantity, // Set total price
    },
  })

  const grandTotal = await prisma.cartItem.aggregate({
    where: {
      customerId: user?.email,
    },
    _sum: {
      totalPrice: true,
    },
  })

  return {
    newCartItem,
    grandTotalPrice: grandTotal._sum.totalPrice || 0,
  }
}

const getAllCartsFromDb = async () => {
  const result = await prisma.cartItem.findMany({
    include: {
      customer: true,
      product: true,
    },
  })

  return result
}

const getSingleCartFromDb = async (cartId: string) => {
  const result = await prisma.cartItem.findUniqueOrThrow({
    where: {
      cartItemId: cartId,
    },
    include: {
      customer: true,
      product: true,
    },
  })

  return result
}

export const CartServices = {
  createCartIntoDb,
  getAllCartsFromDb,
  getSingleCartFromDb,
}
