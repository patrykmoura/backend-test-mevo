-- CreateTable
CREATE TABLE "Operation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "isSuspicious" BOOLEAN NOT NULL DEFAULT false,
    "fileName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "InvalidOperation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "isSuspicious" BOOLEAN NOT NULL DEFAULT false,
    "reason" TEXT NOT NULL,
    "fileName" TEXT NOT NULL
);
