import { MigrationInterface, QueryRunner } from "typeorm";
import { TabelasBancoDados } from "../../../../0-core/infra/dados/tabelas-banco-dados.app";

export class INSERTsituacaoExternaPagamento15851625776173 implements MigrationInterface {
    name = 'INSERTsituacaoExternaPagamento15851625776173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "${TabelasBancoDados.SITUACAO_EXTERNA_PEDIDO}"
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
                'Aguardando Pagamento',
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
