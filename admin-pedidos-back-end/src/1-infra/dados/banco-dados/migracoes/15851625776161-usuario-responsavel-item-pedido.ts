import { MigrationInterface, QueryRunner } from "typeorm";
import { TabelasBancoDados } from "../../../../0-core/infra/dados/tabelas-banco-dados.app";

export class usuarioresponsavelitempedido15851625776161 implements MigrationInterface {
    name = 'usuarioresponsavelitempedido15851625776161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.PEDIDO_ITEM}"
            ADD COLUMN "nomeFuncionarioResponsavel" character varying(45) NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.PEDIDO_ITEM}" 
            DROP COLUMN "nomeFuncionarioResponsavel";
        `);
    }
}
