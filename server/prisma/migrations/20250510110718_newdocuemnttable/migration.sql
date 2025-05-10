/*
  Warnings:

  - You are about to drop the `ConversationDocuments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ConversationDocuments" DROP CONSTRAINT "ConversationDocuments_conversationId_fkey";

-- DropTable
DROP TABLE "ConversationDocuments";

-- CreateTable
CREATE TABLE "Documents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "originalName" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "mimetype" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ConversationToDocuments" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_ConversationToDocuments_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ConversationToDocuments_B_index" ON "_ConversationToDocuments"("B");

-- AddForeignKey
ALTER TABLE "_ConversationToDocuments" ADD CONSTRAINT "_ConversationToDocuments_A_fkey" FOREIGN KEY ("A") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConversationToDocuments" ADD CONSTRAINT "_ConversationToDocuments_B_fkey" FOREIGN KEY ("B") REFERENCES "Documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
