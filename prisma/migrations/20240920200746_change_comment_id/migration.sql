/*
  Warnings:

  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userName` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `albums` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Comment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Comment_id_seq";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "userName";

-- AlterTable
ALTER TABLE "albums" DROP COLUMN "userName";
