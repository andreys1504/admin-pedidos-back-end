import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";

export class idPedidoSistemaPagamentoExterno15851625776171 implements MigrationInterface {
    name = 'idPedidoSistemaPagamentoExterno15851625776171';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PEDIDO}"
            ADD COLUMN "idPedidoEmSistemaPagamentoExterno" character varying(250) NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PEDIDO}"
            DROP COLUMN "idPedidoEmSistemaPagamentoExterno";
        `);
    }
}