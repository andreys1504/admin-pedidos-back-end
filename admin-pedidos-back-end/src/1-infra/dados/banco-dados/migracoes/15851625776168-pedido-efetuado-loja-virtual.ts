import { MigrationInterface, QueryRunner } from "typeorm";
import { TabelasBancoDados } from "../../../../0-core/infra/dados/tabelas-banco-dados.app";

export class pedidoEfetuadoLojaVirtual15851625776168 implements MigrationInterface {
    name = 'pedidoEfetuadoLojaVirtual15851625776168';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.PEDIDO}"
            ADD COLUMN "pedidoRealizadoLojaVirtual" boolean NOT NULL DEFAULT false;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.PEDIDO}"
            DROP COLUMN "pedidoRealizadoLojaVirtual";
        `);
    }
}