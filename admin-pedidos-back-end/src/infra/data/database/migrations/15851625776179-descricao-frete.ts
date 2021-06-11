import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";

export class descricaoFrete215851625776179 implements MigrationInterface {
    name = 'descricaoFrete215851625776179';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PEDIDO_DADOS_ENTREGA}"
            ADD COLUMN "descricaoFrete" character varying(150) NOT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PEDIDO_DADOS_ENTREGA}"
            DROP COLUMN "descricaoFrete";
        `);
    }
}