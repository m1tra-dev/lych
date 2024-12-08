/*
  Warnings:

  - You are about to drop the column `category_id` on the `OrderItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_category_id_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "category_id",
ADD COLUMN     "product_id" INTEGER;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
