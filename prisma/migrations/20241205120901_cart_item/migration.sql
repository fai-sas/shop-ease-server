-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_customerId_fkey";

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
