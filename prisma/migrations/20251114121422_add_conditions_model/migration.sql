-- CreateTable
CREATE TABLE `conditions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `conditions_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ConditionToRecipe` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ConditionToRecipe_AB_unique`(`A`, `B`),
    INDEX `_ConditionToRecipe_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ConditionToRecipe` ADD CONSTRAINT `_ConditionToRecipe_A_fkey` FOREIGN KEY (`A`) REFERENCES `conditions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ConditionToRecipe` ADD CONSTRAINT `_ConditionToRecipe_B_fkey` FOREIGN KEY (`B`) REFERENCES `recipes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
