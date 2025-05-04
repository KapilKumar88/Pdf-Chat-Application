-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "lastMessage" TEXT,
ADD COLUMN     "totalDocuments" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "ConversationDocuments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "conversationId" UUID NOT NULL,
    "originalName" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "mimetype" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConversationDocuments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ConversationDocuments" ADD CONSTRAINT "ConversationDocuments_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
