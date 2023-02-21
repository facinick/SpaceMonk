-- CreateTable
CREATE TABLE "UserPresence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lastSeen" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "UserPresence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPresence_userId_key" ON "UserPresence"("userId");
