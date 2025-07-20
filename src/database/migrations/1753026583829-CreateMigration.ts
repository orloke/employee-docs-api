import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMigration1753026583829 implements MigrationInterface {
    name = 'CreateMigration1753026583829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document_type" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document_type" DROP COLUMN "deletedAt"`);
    }

}
