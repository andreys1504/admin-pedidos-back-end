import { MigrationInterface, QueryRunner } from "typeorm";
import { TabelasBancoDados } from "../../../../0-core/infra/dados/tabelas-banco-dados.app";

export class idPedidoSistemaPagamentoExterno15851625776171 implements MigrationInterface {
    name = 'idPedidoSistemaPagamentoExterno15851625776171';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.PEDIDO}"
            ADD COLUMN "idPedidoEmSistemaPagamentoExterno" character varying(250) NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.PEDIDO}"
            DROP COLUMN "idPedidoEmSistemaPagamentoExterno";
        `);
    }
}