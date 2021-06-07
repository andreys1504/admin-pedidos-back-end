import { MigrationInterface, QueryRunner } from "typeorm";
import { TabelasBancoDados } from "../../../../0-core/infra/dados/tabelas-banco-dados.app";

export class pedidoDadosEntregaId15851625776178 implements MigrationInterface {
    name = 'pedidoDadosEntregaId15851625776178';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.PEDIDO}"
            ADD COLUMN "pedidoDadosEntregaId" integer NULL;
        `);

        await queryRunner.query(`
                ALTER TABLE 
                    "${TabelasBancoDados.PEDIDO}" 
                ADD CONSTRAINT "FK_pedidoDadosEntregaId_pedidoDadosEntrega" 
                    FOREIGN KEY ("pedidoDadosEntregaId") 
                    REFERENCES "${TabelasBancoDados.PEDIDO_DADOS_ENTREGA}"("id") 
                ON DELETE RESTRICT
                ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.PEDIDO}"
            DROP COLUMN "pedidoDadosEntregaId";
        `);
    }
}