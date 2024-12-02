import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { CategoryServices } from './category.service'
import httpStatus from 'http-status'

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategoryIntoDb(req.body)

  sendResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: 'Category created successfully',
    data: result,
  })
})

const getAllCategories = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoriesFromDb()

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Categories retrieved successfully',
    data: result,
  })
})

const getSingleCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params

  const result = await CategoryServices.getSingleCategoryFromDb(categoryId)

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Category retrieved successfully',
    data: result,
  })
})

const updateCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params

  const result = await CategoryServices.updateCategoryIntoDb(
    categoryId,
    req.body
  )

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Category updated successfully',
    data: result,
  })
})

export const CategoryControllers = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
}
