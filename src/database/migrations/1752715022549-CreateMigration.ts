import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMigration1752715022549 implements MigrationInterface {
    name = 'CreateMigration1752715022549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_8438ee28d3a542b106dcd8d7289"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "document"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "document" character(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_8438ee28d3a542b106dcd8d7289" UNIQUE ("document")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_8438ee28d3a542b106dcd8d7289"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "document"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "document" character varying(11)`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_8438ee28d3a542b106dcd8d7289" UNIQUE ("document")`);
    }

}
