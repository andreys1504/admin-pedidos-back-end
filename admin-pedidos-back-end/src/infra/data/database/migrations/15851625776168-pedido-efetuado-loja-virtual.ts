import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";

export class pedidoEfetuadoLojaVirtual15851625776168 implements MigrationInterface {
    name = 'pedidoEfetuadoLojaVirtual15851625776168';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PEDIDO}"
            ADD COLUMN "pedidoRealizadoLojaVirtual" boolean NOT NULL DEFAULT false;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PEDIDO}"
            DROP COLUMN "pedidoRealizadoLojaVirtual";
        `);
    }
}