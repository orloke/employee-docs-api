import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMigration1752711562027 implements MigrationInterface {
    name = 'CreateMigration1752711562027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "deletedAt"`);
    }

}
