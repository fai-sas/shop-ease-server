import { Customers, UserRole, Vendor } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { Request } from 'express'
import prisma from '../../utils/prisma'

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

export const AuthService = {
  createCustomerIntoDb,
  createVendorIntoDb,
}
