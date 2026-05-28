-- CreateTable
CREATE TABLE "ItemChecklist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "completadoEn" DATETIME,
    CONSTRAINT "ItemChecklist_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemChecklist_clienteId_slug_key" ON "ItemChecklist"("clienteId", "slug");
