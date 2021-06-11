import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";

export class INSERTsituacaoExternaPagamento15851625776174 implements MigrationInterface {
    name = 'INSERTsituacaoExternaPagamento15851625776174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "${DatabaseTables.SITUACAO_EXTERNA_PEDIDO}"
            (
                id
                ,descricao
                ,ativo
                ,"dataCriacao"
                ,"dataAtualizacao"
            )
            VALUES
            (
                5,
                'Enviado',
                true,

                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "${DatabaseTables.TIPO_PAGAMENTO_PEDIDO}" WHERE "id" = '5'
        `);
    }
}
