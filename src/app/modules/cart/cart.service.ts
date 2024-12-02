import { CartItem } from '@prisma/client'
import { TAuthUser } from '../../interface/common'
import prisma from '../../utils/prisma'

const createCartIntoDb = async (user: TAuthUser, payload: CartItem) => {
  try {
    await prisma.user.findUniqueOrThrow({
      where: {
        email: user?.email,
      },
    })
  } catch (error) {
    throw new Error(`Vendor with email ${user?.email} not found.`)
  }

  try {
    await prisma.product.findUniqueOrThrow({
      where: {
        productId: payload.productId,
      },
    })
  } catch (error) {
    throw new Error(`Category with ID ${payload.productId} not found.`)
  }

  const result = await prisma.cartItem.create({
    data: { ...payload, customerId: user?.email },
  })

  return result
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
