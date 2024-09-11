/*
  Warnings:

  - You are about to drop the column `images` on the `albums` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_albumId_fkey";

-- AlterTable
ALTER TABLE "albums" DROP COLUMN "images";

-- DropTable
DROP TABLE "Image";
