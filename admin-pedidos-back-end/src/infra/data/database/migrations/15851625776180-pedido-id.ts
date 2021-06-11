import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";

export class pedidoId215851625776180 implements MigrationInterface {
    name = 'pedidoId215851625776180';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PEDIDO}"
            DROP COLUMN "pedidoDadosEntregaId";
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PEDIDO}"
            ADD COLUMN "pedidoDadosEntregaId" integer NULL;
        `);

        await queryRunner.query(`
                ALTER TABLE 
                    "${DatabaseTables.PEDIDO}" 
                ADD CONSTRAINT "FK_pedidoDadosEntregaId_pedidoDadosEntrega" 
                    FOREIGN KEY ("pedidoDadosEntregaId") 
                    REFERENCES "${DatabaseTables.PEDIDO_DADOS_ENTREGA}"("id") 
                ON DELETE RESTRICT
                ON UPDATE CASCADE
        `);
    }
}