import { Prisma, Product } from '@prisma/client'
import prisma from '../../utils/prisma'
import { TAuthUser } from '../../interface/common'
import { TPaginationOptions } from '../../interface/pagination'
import { paginationHelper } from '../../utils/pagination'
import { productSearchableFields } from './product.constant'

const createProductIntoDb = async (user: TAuthUser, payload: Product) => {
  try {
    await prisma.vendor.findUniqueOrThrow({
      where: {
        email: user?.email,
      },
    })
  } catch (error) {
    throw new Error(`Vendor with email ${user?.email} not found.`)
  }

  try {
    await prisma.category.findUniqueOrThrow({
      where: {
        categoryId: payload.categoryId,
      },
    })
  } catch (error) {
    throw new Error(`Category with ID ${payload.categoryId} not found.`)
  }

  const result = await prisma.product.create({
    data: { ...payload, vendorId: user?.email },
  })

  return result
}

const getAllProductsFromDb = async (
  filters: any,
  options: TPaginationOptions
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions: Prisma.ProductWhereInput[] = []

  if (searchTerm) {
    andConditions.push({
      OR: productSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.keys(filterData).map((key) => ({
      [key]: {
        equals: (filterData as any)[key],
      },
    }))
    andConditions.push(...filterConditions)
  }

  andConditions.push({
    isDeleted: false,
  })

  const whereConditions: Prisma.ProductWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.product.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
    include: {
      vendor: true,
      category: true,
    },
  })

  const total = await prisma.product.count({
    where: whereConditions,
  })

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}

const getSingleProductFromDb = async (productId: string) => {
  const result = await prisma.product.findUniqueOrThrow({
    where: {
      productId,
    },
    include: {
      vendor: true,
      category: true,
    },
  })

  return result
}

export const ProductServices = {
  createProductIntoDb,
  getAllProductsFromDb,
  getSingleProductFromDb,
}
