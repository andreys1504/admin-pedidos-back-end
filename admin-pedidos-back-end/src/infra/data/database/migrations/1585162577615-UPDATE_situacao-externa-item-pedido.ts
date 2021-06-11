import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";

export class UPDATEsituacaoexternaitempedido1585162577615 implements MigrationInterface {
    name = 'UPDATEsituacaoexternaitempedido1585162577615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE "${DatabaseTables.SITUACAO_EXTERNA_ITEM_PEDIDO}"
            SET "descricao" = 'Em Andamento'
            WHERE "id" = '1'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE "${DatabaseTables.SITUACAO_EXTERNA_ITEM_PEDIDO}"
            SET "descricao" = 'Finalizando'
            WHERE "id" = '1'
        `);
    }
}
