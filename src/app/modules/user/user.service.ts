import { UserStatus } from '@prisma/client'
import prisma from '../../utils/prisma'

const getAllUsersFromDb = async () => {
  const result = await prisma.user.findMany({
    include: {
      vendor: true,
      customer: true,
    },
  })

  return result
}

// const getSingleUserFromDb = async (userId: string) => {
//   const result = await prisma.user.findUniqueOrThrow({
//     where: {
//       userId,
//     },
//     include: {
//       vendor: true,
//       customer: true,
//     },
//   })

//   return result
// }

const getSingleUserFromDb = async (userId: string) => {
  const result = await prisma.user.findUnique({
    where: {
      userId,
    },
    include: {
      vendor: true, // Nullable relation
      customer: true, // Nullable relation
    },
  })

  if (!result) {
    throw new Error(`User with ID ${userId} not found.`)
  }

  return result
}

const getAllVendorsFromDb = async () => {
  const result = await prisma.vendor.findMany({
    include: {
      user: true,
      products: true,
    },
  })

  return result
}

const getSingleVendorFromDb = async (vendorId: string) => {
  const result = await prisma.vendor.findUniqueOrThrow({
    where: {
      vendorId,
    },
    include: {
      user: true,
      products: true,
    },
  })

  return result
}

const deleteUserFromDb = async (userId: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      userId,
    },
  })

  const result = await prisma.user.update({
    where: {
      userId,
    },
    data: {
      status: UserStatus.DELETED,
    },
  })

  return result
}

export const UserServices = {
  getAllUsersFromDb,
  getSingleUserFromDb,
  getAllVendorsFromDb,
  getSingleVendorFromDb,
  deleteUserFromDb,
}
