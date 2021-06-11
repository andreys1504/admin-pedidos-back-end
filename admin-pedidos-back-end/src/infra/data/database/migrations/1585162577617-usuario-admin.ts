import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";

export class usuarioadmin1585162577617 implements MigrationInterface {
    name = 'usuarioadmin1585162577617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PEDIDO}" 
            RENAME COLUMN "usuarioId" TO "usuarioRegistroPedidoId";
        `);

        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.USUARIO_PERMISSOES}" 
            RENAME COLUMN "usuarioId" TO "usuarioAdminId";
        `);

        await queryRunner.query(`
            ALTER TABLE "usuario"
            RENAME TO "${DatabaseTables.USUARIO_ADMIN}";
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PEDIDO}" 
            RENAME COLUMN "usuarioRegistroPedidoId" TO "usuarioId";
        `);

        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PERMISSAO_ACESSO}" 
            RENAME COLUMN "usuarioAdminId" TO "usuarioId";
        `);

        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.USUARIO_ADMIN}"
            RENAME TO "usuario";
        `);
    }
}
