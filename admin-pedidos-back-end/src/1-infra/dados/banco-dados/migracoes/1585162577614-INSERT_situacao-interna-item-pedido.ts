import { MigrationInterface, QueryRunner } from "typeorm";
import { TabelasBancoDados } from "../../../../0-core/infra/dados/tabelas-banco-dados.app";

export class INSERTsituacaointernaitempedido1585162577614 implements MigrationInterface {
    name = 'INSERTsituacaointernaitempedido1585162577614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "${TabelasBancoDados.SITUACAO_INTERNA_ITEM_PEDIDO}"
            (
                id
                ,descricao
                ,ativo
                ,"dataCriacao"
                ,"dataAtualizacao"
            )
            VALUES
            (
                10,
                'Bordado',
                true,
        
                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "${TabelasBancoDados.SITUACAO_INTERNA_ITEM_PEDIDO}" WHERE "id" = '10'
        `);
    }
}
