import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";

export class usuarioresponsavelitempedido15851625776161 implements MigrationInterface {
    name = 'usuarioresponsavelitempedido15851625776161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PEDIDO_ITEM}"
            ADD COLUMN "nomeFuncionarioResponsavel" character varying(45) NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PEDIDO_ITEM}" 
            DROP COLUMN "nomeFuncionarioResponsavel";
        `);
    }
}
