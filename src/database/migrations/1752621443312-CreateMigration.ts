import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMigration1752621443312 implements MigrationInterface {
    name = 'CreateMigration1752621443312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "document" character varying(11), "hiredAt" TIMESTAMP NOT NULL, CONSTRAINT "UQ_8438ee28d3a542b106dcd8d7289" UNIQUE ("document"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "employee"`);
    }

}
