import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthService } from './auth.service'
import httpStatus from 'http-status'

const createCustomer = catchAsync(async (req, res) => {
  const result = await AuthService.createCustomerIntoDb(req)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Customer Created Successfully!',
    data: result,
  })
})

const createVendor = catchAsync(async (req, res) => {
  const result = await AuthService.createVendorIntoDb(req)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Vendor Created Successfully!',
    data: result,
  })
})

export const AuthController = {
  createCustomer,
  createVendor,
}
