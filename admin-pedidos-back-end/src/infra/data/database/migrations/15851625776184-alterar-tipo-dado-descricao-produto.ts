import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";

export class alterarTipoDadoDescricaoProduto15851625776184 implements MigrationInterface {
    name = 'alterarTipoDadoDescricaoProduto15851625776184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PRODUTO}"
            ALTER COLUMN "descricao" TYPE character varying(150)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PRODUTO}"
            ALTER COLUMN "descricao" TYPE character varying(65)
        `);
    }
}
