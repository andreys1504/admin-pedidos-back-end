import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";

export class renomeacaoConfirmacaoPagamentoPendente15851625776170 implements MigrationInterface {
    name = 'renomeacaoConfirmacaoPagamentoPendente15851625776170';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PEDIDO}" 
            RENAME COLUMN "confirmacaoPagamentoPendente" TO "pagamentoPendente";
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${DatabaseTables.PEDIDO}" 
            RENAME COLUMN "pagamentoPendente" TO "confirmacaoPagamentoPendente";
        `);
    }
}




