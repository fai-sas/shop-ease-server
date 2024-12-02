import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { UserServices } from './user.service'
import { TAuthUser } from '../../interface/common'
import { Request, Response } from 'express'

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDb()

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Users retrieved successfully',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params

  console.log('Fetching user with ID:', userId) // Debugging

  try {
    const result = await UserServices.getSingleUserFromDb(userId)

    sendResponse(res, {
      success: true,
      status: httpStatus.OK,
      message: 'User retrieved successfully',
      data: result,
    })
  } catch (error) {
    console.error(error.message)
    res.status(httpStatus.NOT_FOUND).send({
      success: false,
      message: error.message,
    })
  }
})

const getAllVendors = catchAsync(async (req, res) => {
  const result = await UserServices.getAllVendorsFromDb()

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Vendors retrieved successfully',
    data: result,
  })
})

const getSingleVendor = catchAsync(async (req, res) => {
  const { vendorId } = req.params

  const result = await UserServices.getSingleVendorFromDb(vendorId)

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Vendor retrieved successfully',
    data: result,
  })
})

const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params

  const result = await UserServices.deleteUserFromDb(userId)

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'User deleted successfully',
    data: result,
  })
})

const getMyProfile = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user
    const result = await UserServices.getMyProfileFromDb(user as TAuthUser)

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'My profile data fetched!',
      data: result,
    })
  }
)

const getCustomerProfile = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user
    const result = await UserServices.getCustomerProfileFromDb(
      user as TAuthUser
    )

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Customer profile data fetched!',
      data: result,
    })
  }
)

export const UserControllers = {
  getAllUsers,
  getSingleUser,
  getAllVendors,
  getSingleVendor,
  deleteUser,
  getMyProfile,
  getCustomerProfile,
}
