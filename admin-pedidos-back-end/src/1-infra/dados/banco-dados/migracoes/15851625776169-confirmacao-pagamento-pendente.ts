import { MigrationInterface, QueryRunner } from "typeorm";
import { TabelasBancoDados } from "../../../../0-core/infra/dados/tabelas-banco-dados.app";

export class confirmacaoPagamentoPendente15851625776169 implements MigrationInterface {
    name = 'confirmacaoPagamentoPendente15851625776169';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.PEDIDO}"
            ADD COLUMN "confirmacaoPagamentoPendente" boolean NULL DEFAULT false;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.PEDIDO}"
            DROP COLUMN "confirmacaoPagamentoPendente";
        `);
    }
}