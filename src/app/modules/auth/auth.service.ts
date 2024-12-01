import { Customers, UserRole, UserStatus, Vendor } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { Request } from 'express'
import prisma from '../../utils/prisma'
import AppError from '../../errors/AppError'
import { jwtHelpers } from '../../utils/jwtHelpers'
import config from '../../config'
import { Secret } from 'jsonwebtoken'

const createCustomerIntoDb = async (req: Request): Promise<Customers> => {
  const hashedPassword: string = await bcrypt.hash(req.body.password, 12)

  const userData = {
    email: req.body.customer.email,
    password: hashedPassword,
    role: UserRole.USER,
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    })

    const createdCustomerData = await transactionClient.customers.create({
      data: req.body.customer,
    })

    return createdCustomerData
  })

  return result
}

const createVendorIntoDb = async (req: Request): Promise<Vendor> => {
  const hashedPassword: string = await bcrypt.hash(req.body.password, 12)

  const userData = {
    email: req.body.vendor.email,
    password: hashedPassword,
    role: UserRole.USER,
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    })

    const createdVendorData = await transactionClient.vendor.create({
      data: req.body.vendor,
    })

    return createdVendorData
  })

  return result
}

const loginUserIntoDb = async (payload: {
  email: string
  password: string
}) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  })

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  )

  if (!isCorrectPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Incorrect Password!')
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  )

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  )

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  }
}

export const AuthService = {
  createCustomerIntoDb,
  createVendorIntoDb,
  loginUserIntoDb,
}
