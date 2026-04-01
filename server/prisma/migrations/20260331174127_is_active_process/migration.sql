/*
  Warnings:

  - You are about to drop the column `testField` on the `notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `notification` DROP COLUMN `testField`;

-- AlterTable
ALTER TABLE `process` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;
