/*
  Warnings:

  - You are about to drop the column `grandTotalPrice` on the `cart_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cart_items" DROP COLUMN "grandTotalPrice",
ADD COLUMN     "randTotalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
