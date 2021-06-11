import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";

export class MedidasCliente1585162577620 implements MigrationInterface {
    name = 'MedidasCliente1585162577620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.CLIENTE}"
            ADD COLUMN "medidasCliente" TEXT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.CLIENTE}"
            DROP COLUMN "medidasCliente";
        `);
    }
}