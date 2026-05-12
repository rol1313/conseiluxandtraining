-- CreateTable
CREATE TABLE `Resource` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `excerpt` TEXT NULL,
    `content` TEXT NULL,
    `image` VARCHAR(191) NULL,
    `type` ENUM('INTERVIEW', 'LIVRE_BLANC', 'PRESSE', 'WEBINAIRE') NOT NULL,
    `date` DATETIME(3) NULL,
    `duration` VARCHAR(191) NULL,
    `speaker` VARCHAR(191) NULL,
    `link` VARCHAR(191) NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `authorId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Resource_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Resource` ADD CONSTRAINT `Resource_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
