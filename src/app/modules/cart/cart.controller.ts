import { TAuthUser } from '../../interface/common'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { CartServices } from './cart.service'
import httpStatus from 'http-status'
import { Request, Response } from 'express'

const createCart = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user
    console.log(user)

    const result = await CartServices.createCartIntoDb(user!, req.body)

    sendResponse(res, {
      success: true,
      status: httpStatus.CREATED,
      message: 'Product added to Cart successfully',
      data: result,
    })
  }
)

const getAllCarts = catchAsync(async (req, res) => {
  const result = await CartServices.getAllCartsFromDb()

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Cart items retrieved successfully',
    data: result,
  })
})

const getSingleCart = catchAsync(async (req, res) => {
  const { cartId } = req.params

  const result = await CartServices.getSingleCartFromDb(cartId)

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Cart items retrieved successfully',
    data: result,
  })
})

export const CartControllers = {
  createCart,
  getAllCarts,
  getSingleCart,
}
