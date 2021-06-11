import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";

export class INSERTtipopagamento1585162577613 implements MigrationInterface {
    name = 'INSERTtipopagamento1585162577613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "${DatabaseTables.TIPO_PAGAMENTO_PEDIDO}"
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
            DELETE FROM "${DatabaseTables.TIPO_PAGAMENTO_PEDIDO}" WHERE "id" = '4'
        `);
    }
}
