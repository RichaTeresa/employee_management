import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAgeToEmployee1747817586783 implements MigrationInterface {
    name = 'AddAgeToEmployee1747817586783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "age" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "age"`);
    }

}
