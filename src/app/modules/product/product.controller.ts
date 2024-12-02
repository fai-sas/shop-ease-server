import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { ProductServices } from './product.service'
import sendResponse from '../../utils/sendResponse'
import { TAuthUser } from '../../interface/common'
import { Request, Response } from 'express'
import pick from '../../utils/pick'
import { productFilterableFields } from './product.constant'

const createProduct = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user

    const result = await ProductServices.createProductIntoDb(user!, req.body)
    console.log(result)

    sendResponse(res, {
      success: true,
      status: httpStatus.CREATED,
      message: 'Product created successfully',
      data: result,
    })
  }
)

const getAllProducts = catchAsync(async (req, res) => {
  const filters = pick(req.query, productFilterableFields)
  console.log(filters)

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

  const result = await ProductServices.getAllProductsFromDb(filters, options)

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Products retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params

  const result = await ProductServices.getSingleProductFromDb(productId)

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Product retrieved successfully',
    data: result,
  })
})

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
}
