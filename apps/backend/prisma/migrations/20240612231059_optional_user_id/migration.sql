-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Shortner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "hits" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expireAt" DATETIME NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Shortner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Shortner" ("createdAt", "expireAt", "hash", "hits", "id", "url", "userId") SELECT "createdAt", "expireAt", "hash", "hits", "id", "url", "userId" FROM "Shortner";
DROP TABLE "Shortner";
ALTER TABLE "new_Shortner" RENAME TO "Shortner";
CREATE UNIQUE INDEX "Shortner_hash_key" ON "Shortner"("hash");
PRAGMA foreign_key_check("Shortner");
PRAGMA foreign_keys=ON;
