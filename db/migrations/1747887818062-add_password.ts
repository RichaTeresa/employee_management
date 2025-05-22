import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPassword1747887818062 implements MigrationInterface {
    name = 'AddPassword1747887818062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying `);
        await queryRunner.query(`UPDATE "employee" SET "password"='password' WHERE "password" IS NULL`)
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "password" SET NOT NULL` )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }

}
