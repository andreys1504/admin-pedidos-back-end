import { MigrationInterface, QueryRunner } from "typeorm";
import { TabelasBancoDados } from "../../../../0-core/infra/dados/tabelas-banco-dados.app";

export class pedidoId215851625776180 implements MigrationInterface {
    name = 'pedidoId215851625776180';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.PEDIDO}"
            DROP COLUMN "pedidoDadosEntregaId";
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
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
}