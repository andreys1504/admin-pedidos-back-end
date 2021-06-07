import { MigrationInterface, QueryRunner } from "typeorm";
import { TabelasBancoDados } from "../../../../0-core/infra/dados/tabelas-banco-dados.app";

export class descricaoFrete215851625776179 implements MigrationInterface {
    name = 'descricaoFrete215851625776179';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.PEDIDO_DADOS_ENTREGA}"
            ADD COLUMN "descricaoFrete" character varying(150) NOT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.PEDIDO_DADOS_ENTREGA}"
            DROP COLUMN "descricaoFrete";
        `);
    }
}