-- CreateTable
CREATE TABLE "TokenGHL" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "locationId" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
