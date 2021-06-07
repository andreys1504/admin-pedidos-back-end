import { MigrationInterface, QueryRunner } from "typeorm";
import { TabelasBancoDados } from "../../../../0-core/infra/dados/tabelas-banco-dados.app";

export class usuarioresponsavelpedido1585162577616 implements MigrationInterface {
    name = 'usuarioresponsavelpedido1585162577616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.PEDIDO}"
            ADD COLUMN "usuarioResponsavelPedidoId" integer NULL;
        `);

        await queryRunner.query(`
            ALTER TABLE 
            "${TabelasBancoDados.PEDIDO}" 
            ADD CONSTRAINT "FK_usuarioResponsavelPedidoId_pedido" 
                FOREIGN KEY ("usuarioResponsavelPedidoId") 
                REFERENCES "usuario"("id") 
            ON DELETE RESTRICT 
            ON UPDATE RESTRICT
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.PEDIDO}"
            DROP CONSTRAINT "FK_usuarioResponsavelPedidoId_pedido";
        `);

        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.PEDIDO}" 
            DROP COLUMN "idUsuarioResponsavelPedido";
        `);
    }
}
