/*
  Warnings:

  - You are about to drop the column `randTotalPrice` on the `cart_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cart_items" DROP COLUMN "randTotalPrice",
ADD COLUMN     "grandTotalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
