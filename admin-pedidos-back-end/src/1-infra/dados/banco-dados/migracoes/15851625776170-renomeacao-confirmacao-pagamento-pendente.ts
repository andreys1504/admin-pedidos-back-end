import { MigrationInterface, QueryRunner } from "typeorm";
import { TabelasBancoDados } from "../../../../0-core/infra/dados/tabelas-banco-dados.app";

export class renomeacaoConfirmacaoPagamentoPendente15851625776170 implements MigrationInterface {
    name = 'renomeacaoConfirmacaoPagamentoPendente15851625776170';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.PEDIDO}" 
            RENAME COLUMN "confirmacaoPagamentoPendente" TO "pagamentoPendente";
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.PEDIDO}" 
            RENAME COLUMN "pagamentoPendente" TO "confirmacaoPagamentoPendente";
        `);
    }
}




