import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";

export class tipoPagamento15851625776164 implements MigrationInterface {
    name = 'tipoPagamento15851625776164';

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
            values
            (
                5,
                'PagSeguro',
                true,
                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "${DatabaseTables.TIPO_PAGAMENTO_PEDIDO}" WHERE "id" = 4
        `);
    }
}