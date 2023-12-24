const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddMenuStockMigrations1703351985440 {
    name = 'AddMenuStockMigrations1703351985440'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`menus\` ADD \`stock\` int NOT NULL DEFAULT '0' AFTER \`price\``);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`menus\` DROP COLUMN \`stock\``);
    }
}
