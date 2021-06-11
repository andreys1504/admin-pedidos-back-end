import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";

export class pedidoDadosEntregaId15851625776178 implements MigrationInterface {
    name = 'pedidoDadosEntregaId15851625776178';

    public async up(queryRunner: QueryRunner): Promise<void> {
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

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PEDIDO}"
            DROP COLUMN "pedidoDadosEntregaId";
        `);
    }
}