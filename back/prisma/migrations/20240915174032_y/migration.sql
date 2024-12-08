/*
  Warnings:

  - The `isActivated` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "activationLink" DROP DEFAULT,
ALTER COLUMN "activationLink" SET DATA TYPE TEXT,
DROP COLUMN "isActivated",
ADD COLUMN     "isActivated" BOOLEAN NOT NULL DEFAULT false;
