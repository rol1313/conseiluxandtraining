/*
  Warnings:

  - You are about to drop the column `endDate` on the `Formation` table. All the data in the column will be lost.
  - You are about to drop the column `mode` on the `Formation` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Formation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Formation` DROP COLUMN `endDate`,
    DROP COLUMN `mode`,
    DROP COLUMN `startDate`;

-- CreateTable
CREATE TABLE `Session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NULL,
    `mode` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NULL,
    `duration` VARCHAR(191) NULL,
    `price` VARCHAR(191) NULL,
    `slug` VARCHAR(191) NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `gradient` VARCHAR(191) NOT NULL DEFAULT 'from-primary to-primary-dark',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
