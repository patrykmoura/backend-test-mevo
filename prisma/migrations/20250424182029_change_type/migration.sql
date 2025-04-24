/*
  Warnings:

  - You are about to alter the column `amount` on the `InvalidOperation` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `amount` on the `Operation` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InvalidOperation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "isSuspicious" BOOLEAN NOT NULL DEFAULT false,
    "reason" TEXT NOT NULL,
    "fileName" TEXT NOT NULL
);
INSERT INTO "new_InvalidOperation" ("amount", "fileName", "from", "id", "isSuspicious", "reason", "to") SELECT "amount", "fileName", "from", "id", "isSuspicious", "reason", "to" FROM "InvalidOperation";
DROP TABLE "InvalidOperation";
ALTER TABLE "new_InvalidOperation" RENAME TO "InvalidOperation";
CREATE TABLE "new_Operation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "isSuspicious" BOOLEAN NOT NULL DEFAULT false,
    "fileName" TEXT NOT NULL
);
INSERT INTO "new_Operation" ("amount", "fileName", "from", "id", "isSuspicious", "to") SELECT "amount", "fileName", "from", "id", "isSuspicious", "to" FROM "Operation";
DROP TABLE "Operation";
ALTER TABLE "new_Operation" RENAME TO "Operation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
