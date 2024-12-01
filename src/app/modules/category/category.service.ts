import { Category } from '@prisma/client'
import prisma from '../../utils/prisma'

const createCategoryIntoDb = async (payload: Category) => {
  const result = await prisma.category.create({
    data: payload,
  })

  return result
}

const getAllCategoriesFromDb = async () => {
  const result = await prisma.category.findMany()

  return result
}

const getSingleCategoryFromDb = async (categoryId: string) => {
  const result = await prisma.category.findUniqueOrThrow({
    where: {
      categoryId,
    },
  })

  return result
}

const updateCategoryIntoDb = async (
  categoryId: string,
  payload: Partial<Category>
) => {
  await prisma.category.findUniqueOrThrow({
    where: {
      categoryId,
    },
  })

  const result = await prisma.category.update({
    where: {
      categoryId,
    },
    data: payload,
  })

  return result
}

export const BookServices = {
  createCategoryIntoDb,
  getAllCategoriesFromDb,
  getSingleCategoryFromDb,
  updateCategoryIntoDb,
}
