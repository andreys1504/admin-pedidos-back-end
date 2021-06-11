import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";

export class INSERTsituacaointernaitempedido1585162577614 implements MigrationInterface {
    name = 'INSERTsituacaointernaitempedido1585162577614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "${DatabaseTables.SITUACAO_INTERNA_ITEM_PEDIDO}"
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
            DELETE FROM "${DatabaseTables.SITUACAO_INTERNA_ITEM_PEDIDO}" WHERE "id" = '10'
        `);
    }
}
