/*
  Warnings:

  - A unique constraint covering the columns `[recoverCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "recoverCode" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_recoverCode_key" ON "User"("recoverCode");
