/*
  Warnings:

  - The `age` column on the `UserProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `interests` column on the `UserProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "age",
ADD COLUMN     "age" INTEGER,
DROP COLUMN "interests",
ADD COLUMN     "interests" TEXT[];
