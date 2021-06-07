import { MigrationInterface, QueryRunner } from "typeorm";
import { TabelasBancoDados } from "../../../../0-core/infra/dados/tabelas-banco-dados.app";

export class MedidasCliente1585162577620 implements MigrationInterface {
    name = 'MedidasCliente1585162577620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.CLIENTE}"
            ADD COLUMN "medidasCliente" TEXT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.CLIENTE}"
            DROP COLUMN "medidasCliente";
        `);
    }
}