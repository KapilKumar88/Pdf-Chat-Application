/*
  Warnings:

  - You are about to drop the column `path` on the `Documents` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Documents` table. All the data in the column will be lost.
  - Added the required column `publicUrl` to the `Documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadedPath` to the `Documents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Documents" DROP COLUMN "path",
DROP COLUMN "url",
ADD COLUMN     "publicUrl" TEXT NOT NULL,
ADD COLUMN     "uploadedPath" TEXT NOT NULL;
