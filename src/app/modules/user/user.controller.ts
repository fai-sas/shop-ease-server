import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { UserServices } from './user.service'

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDb()

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Users retrieved successfully',
    data: result,
  })
})

// const getSingleUser = catchAsync(async (req, res) => {
//   const { userId } = req.params

//   const result = await UserServices.getSingleUserFromDb(userId)

//   sendResponse(res, {
//     success: true,
//     status: httpStatus.OK,
//     message: 'User retrieved successfully',
//     data: result,
//   })
// })

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
    console.error(error.message) // Log the error
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

export const UserControllers = {
  getAllUsers,
  getSingleUser,
  getAllVendors,
  getSingleVendor,
  deleteUser,
}
