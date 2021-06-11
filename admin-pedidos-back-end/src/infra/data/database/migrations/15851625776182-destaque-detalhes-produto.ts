import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";

export class destaqueDetalhesProduto15851625776182 implements MigrationInterface {
    name = 'destaqueDetalhesProduto15851625776182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PRODUTO}"
            ADD COLUMN "detalhesProduto" TEXT NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PRODUTO}"
            ADD COLUMN "destaqueTelaPrincipal" boolean NOT NULL DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PRODUTO}"
            DROP COLUMN "detalhesProduto";
        `);

        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PRODUTO}"
            DROP COLUMN "destaqueTelaPrincipal";
        `);
    }
}
