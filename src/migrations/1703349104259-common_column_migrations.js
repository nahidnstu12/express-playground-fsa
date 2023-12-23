const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CommonColumnMigrations1703349104259 {
    name = 'CommonColumnMigrations1703349104259'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`menus\` ADD \`row_status\` enum ('0', '1', '2', '3') NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`menus\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`carts\` ADD \`row_status\` enum ('0', '1', '2', '3') NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`carts\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`row_status\` enum ('0', '1', '2', '3') NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`deleted_at\` datetime(6) NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`row_status\``);
        await queryRunner.query(`ALTER TABLE \`carts\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`carts\` DROP COLUMN \`row_status\``);
        await queryRunner.query(`ALTER TABLE \`menus\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`menus\` DROP COLUMN \`row_status\``);
    }
}
