import { UserRole, UserStatus } from '@prisma/client'
import prisma from '../../utils/prisma'
import { TAuthUser } from '../../interface/common'

const getAllUsersFromDb = async () => {
  const result = await prisma.user.findMany({
    include: {
      vendor: true,
      customer: true,
    },
  })

  return result
}

const getSingleUserFromDb = async (userId: string) => {
  const result = await prisma.user.findUnique({
    where: {
      userId,
    },
    include: {
      vendor: true,
      customer: true,
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

const getMyProfileFromDb = async (user: TAuthUser) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
      status: UserStatus.ACTIVE,
    },
    select: {
      userId: true,
      email: true,
      role: true,
      status: true,
    },
  })

  let profileInfo

  if (userInfo.role === UserRole.ADMIN) {
    profileInfo = await prisma.user.findUnique({
      where: {
        email: userInfo.email,
      },
    })
  } else if (userInfo.role === UserRole.VENDOR) {
    profileInfo = await prisma.vendor.findUnique({
      where: {
        email: userInfo.email,
      },
    })
  } else if (userInfo.role === UserRole.USER) {
    profileInfo = await prisma.customer.findUnique({
      where: {
        email: userInfo.email,
      },
    })
  }

  return { ...userInfo, ...profileInfo }
}

const getCustomerProfileFromDb = async (user: TAuthUser) => {
  const userInfo = await prisma.customer.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
    include: {
      user: true,
      cartItems: {
        include: {
          product: true,
        },
      },
      orders: true,
      _count: true,
      follows: true,
      recentlyViewed: true,
      reviews: true,
    },
  })

  // Calculate grandTotalPrice for all cart items
  const grandTotalPrice = userInfo?.cartItems?.reduce((sum, item) => {
    return sum + (item.totalPrice || 0)
  }, 0)

  return { ...userInfo, grandTotalPrice }
}

export const UserServices = {
  getAllUsersFromDb,
  getSingleUserFromDb,
  getAllVendorsFromDb,
  getSingleVendorFromDb,
  deleteUserFromDb,
  getMyProfileFromDb,
  getCustomerProfileFromDb,
}
