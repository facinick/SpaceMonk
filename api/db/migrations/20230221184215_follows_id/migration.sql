/*
  Warnings:

  - The primary key for the `Follows` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Follows` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Follows" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "followerId" INTEGER NOT NULL,
    "followingId" INTEGER NOT NULL,
    CONSTRAINT "Follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Follows" ("followerId", "followingId") SELECT "followerId", "followingId" FROM "Follows";
DROP TABLE "Follows";
ALTER TABLE "new_Follows" RENAME TO "Follows";
CREATE UNIQUE INDEX "Follows_followerId_followingId_key" ON "Follows"("followerId", "followingId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
