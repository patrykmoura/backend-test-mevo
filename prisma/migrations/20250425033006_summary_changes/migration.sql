-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InvalidOperation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "summaryId" INTEGER NOT NULL,
    CONSTRAINT "InvalidOperation_summaryId_fkey" FOREIGN KEY ("summaryId") REFERENCES "Summary" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_InvalidOperation" ("amount", "fileName", "from", "id", "reason", "summaryId", "to") SELECT "amount", "fileName", "from", "id", "reason", "summaryId", "to" FROM "InvalidOperation";
DROP TABLE "InvalidOperation";
ALTER TABLE "new_InvalidOperation" RENAME TO "InvalidOperation";
CREATE TABLE "new_Operation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "isSuspicious" BOOLEAN NOT NULL DEFAULT false,
    "reason" TEXT DEFAULT '',
    "fileName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "summaryId" INTEGER NOT NULL,
    CONSTRAINT "Operation_summaryId_fkey" FOREIGN KEY ("summaryId") REFERENCES "Summary" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Operation" ("amount", "fileName", "from", "id", "isSuspicious", "reason", "summaryId", "to") SELECT "amount", "fileName", "from", "id", "isSuspicious", "reason", "summaryId", "to" FROM "Operation";
DROP TABLE "Operation";
ALTER TABLE "new_Operation" RENAME TO "Operation";
CREATE TABLE "new_Summary" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fileName" TEXT NOT NULL,
    "totalValid" INTEGER NOT NULL DEFAULT 0,
    "totalInvalid" INTEGER NOT NULL DEFAULT 0,
    "invalidReasons" TEXT DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Summary" ("fileName", "id") SELECT "fileName", "id" FROM "Summary";
DROP TABLE "Summary";
ALTER TABLE "new_Summary" RENAME TO "Summary";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
