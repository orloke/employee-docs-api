import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMigration1752622537621 implements MigrationInterface {
    name = 'CreateMigration1752622537621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "document_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_d63f0a80a96310fe1e9657795ff" UNIQUE ("name"), CONSTRAINT "PK_2e1aa55eac1947ddf3221506edb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."document_status_enum" AS ENUM('active', 'expired', 'pending', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "document" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "status" "public"."document_status_enum" NOT NULL DEFAULT 'active', "employeeId" integer, "documentTypeId" integer, CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_79168b6c01d01766f5b99dcd741" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_9703ef59358ea636db5dea32ea8" FOREIGN KEY ("documentTypeId") REFERENCES "document_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_9703ef59358ea636db5dea32ea8"`);
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_79168b6c01d01766f5b99dcd741"`);
        await queryRunner.query(`DROP TABLE "document"`);
        await queryRunner.query(`DROP TYPE "public"."document_status_enum"`);
        await queryRunner.query(`DROP TABLE "document_type"`);
    }

}
