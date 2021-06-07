import { MigrationInterface, QueryRunner } from "typeorm";
import { TabelasBancoDados } from "../../../../0-core/infra/dados/tabelas-banco-dados.app";

export class INSERTtipopagamento1585162577613 implements MigrationInterface {
    name = 'INSERTtipopagamento1585162577613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "${TabelasBancoDados.TIPO_PAGAMENTO_PEDIDO}"
            (
                id
                ,descricao
                ,ativo
                ,"dataCriacao"
                ,"dataAtualizacao"
            )
            VALUES
            (
                4,
                'Em aberto',
                true,

                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "${TabelasBancoDados.TIPO_PAGAMENTO_PEDIDO}" WHERE "id" = '4'
        `);
    }
}
