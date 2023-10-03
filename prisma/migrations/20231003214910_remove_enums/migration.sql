/*
  Warnings:

  - Changed the type of `payMethod` on the `Revenue` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `typeRevenue` on the `Revenue` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Revenue" DROP COLUMN "payMethod",
ADD COLUMN     "payMethod" TEXT NOT NULL,
DROP COLUMN "typeRevenue",
ADD COLUMN     "typeRevenue" TEXT NOT NULL;

-- DropEnum
DROP TYPE "PayMethod";

-- DropEnum
DROP TYPE "TypeRevenue";
