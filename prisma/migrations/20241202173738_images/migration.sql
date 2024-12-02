/*
  Warnings:

  - You are about to drop the column `profilePhoto` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `profilePhoto` on the `vendors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customers" DROP COLUMN "profilePhoto",
ADD COLUMN     "images" TEXT;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "images" TEXT[],
ALTER COLUMN "discount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "vendors" DROP COLUMN "profilePhoto",
ADD COLUMN     "images" TEXT;
