-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ContactAdmin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "ContactAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ContactAdmin" ("id", "message", "name") SELECT "id", "message", "name" FROM "ContactAdmin";
DROP TABLE "ContactAdmin";
ALTER TABLE "new_ContactAdmin" RENAME TO "ContactAdmin";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
