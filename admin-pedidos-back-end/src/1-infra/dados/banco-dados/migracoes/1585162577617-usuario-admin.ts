import { MigrationInterface, QueryRunner } from "typeorm";
import { TabelasBancoDados } from "../../../../0-core/infra/dados/tabelas-banco-dados.app";

export class usuarioadmin1585162577617 implements MigrationInterface {
    name = 'usuarioadmin1585162577617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.PEDIDO}" 
            RENAME COLUMN "usuarioId" TO "usuarioRegistroPedidoId";
        `);

        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.USUARIO_PERMISSOES}" 
            RENAME COLUMN "usuarioId" TO "usuarioAdminId";
        `);

        await queryRunner.query(`
            ALTER TABLE "usuario"
            RENAME TO "${TabelasBancoDados.USUARIO_ADMIN}";
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.PEDIDO}" 
            RENAME COLUMN "usuarioRegistroPedidoId" TO "usuarioId";
        `);

        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.PERMISSAO_ACESSO}" 
            RENAME COLUMN "usuarioAdminId" TO "usuarioId";
        `);

        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.USUARIO_ADMIN}"
            RENAME TO "usuario";
        `);
    }
}
