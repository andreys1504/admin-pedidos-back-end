import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";

export class imagemDestaque15851625776183 implements MigrationInterface {
    name = 'imagemDestaque15851625776183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PRODUTO_IMAGENS}"
            ADD COLUMN "imagemDestaque" boolean NOT NULL DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PRODUTO_IMAGENS}"
            DROP COLUMN "imagemDestaque";
        `);
    }
}
