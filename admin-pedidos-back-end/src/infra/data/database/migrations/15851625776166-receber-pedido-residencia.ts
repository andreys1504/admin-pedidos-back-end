import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";

export class receberPedidoResidencia15851625776166 implements MigrationInterface {
    name = 'receberPedidoResidencia15851625776166';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PEDIDO}"
            ADD COLUMN "receberPedidoResidencia" boolean NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PEDIDO}"
            DROP COLUMN "receberPedidoResidencia";
        `);
    }
}