/*
  Warnings:

  - You are about to drop the column `created_at` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `parent_id` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `CartItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderItemStatus" AS ENUM ('PENDING', 'PAYED', 'SHIPPED', 'DELIVERED');

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_userId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "created_at",
DROP COLUMN "description",
DROP COLUMN "image",
DROP COLUMN "link",
DROP COLUMN "name",
DROP COLUMN "parent_id",
DROP COLUMN "price",
DROP COLUMN "updated_at",
ADD COLUMN     "category" TEXT NOT NULL;

-- DropTable
DROP TABLE "CartItem";

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "parent_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "menu_off_the_day" BOOLEAN,
    "image" TEXT,
    "link" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" "OrderItemStatus" NOT NULL DEFAULT 'PENDING',
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "order_id" INTEGER,
    "category_id" INTEGER,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
