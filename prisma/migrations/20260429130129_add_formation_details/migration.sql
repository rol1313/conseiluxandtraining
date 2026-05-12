-- AlterTable
ALTER TABLE `Formation` ADD COLUMN `badges` VARCHAR(191) NULL,
    ADD COLUMN `certifications` TEXT NULL,
    ADD COLUMN `forWho` TEXT NULL,
    ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `modalities` VARCHAR(191) NULL,
    ADD COLUMN `objectives` TEXT NULL,
    ADD COLUMN `prerequisites` TEXT NULL,
    ADD COLUMN `program` TEXT NULL,
    ADD COLUMN `strengths` TEXT NULL,
    ADD COLUMN `trainers` TEXT NULL;
