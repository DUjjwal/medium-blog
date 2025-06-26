/*
  Warnings:

  - Added the required column `tag1` to the `Tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag2` to the `Tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag3` to the `Tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag4` to the `Tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag5` to the `Tags` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tags" ADD COLUMN     "tag1" TEXT NOT NULL,
ADD COLUMN     "tag2" TEXT NOT NULL,
ADD COLUMN     "tag3" TEXT NOT NULL,
ADD COLUMN     "tag4" TEXT NOT NULL,
ADD COLUMN     "tag5" TEXT NOT NULL;
