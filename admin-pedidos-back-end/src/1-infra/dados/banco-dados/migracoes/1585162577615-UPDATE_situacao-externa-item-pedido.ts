import { MigrationInterface, QueryRunner } from "typeorm";
import { TabelasBancoDados } from "../../../../0-core/infra/dados/tabelas-banco-dados.app";

export class UPDATEsituacaoexternaitempedido1585162577615 implements MigrationInterface {
    name = 'UPDATEsituacaoexternaitempedido1585162577615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE "${TabelasBancoDados.SITUACAO_EXTERNA_ITEM_PEDIDO}"
            SET "descricao" = 'Em Andamento'
            WHERE "id" = '1'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE "${TabelasBancoDados.SITUACAO_EXTERNA_ITEM_PEDIDO}"
            SET "descricao" = 'Finalizando'
            WHERE "id" = '1'
        `);
    }
}
