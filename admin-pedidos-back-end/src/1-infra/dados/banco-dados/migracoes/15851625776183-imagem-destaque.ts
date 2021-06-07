import { MigrationInterface, QueryRunner } from "typeorm";
import { TabelasBancoDados } from "../../../../0-core/infra/dados/tabelas-banco-dados.app";

export class imagemDestaque15851625776183 implements MigrationInterface {
    name = 'imagemDestaque15851625776183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.PRODUTO_IMAGENS}"
            ADD COLUMN "imagemDestaque" boolean NOT NULL DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.PRODUTO_IMAGENS}"
            DROP COLUMN "imagemDestaque";
        `);
    }
}
