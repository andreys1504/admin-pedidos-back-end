

import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";

export class pedidoDadosEntrega15851625776177 implements MigrationInterface {
    name = 'pedidoDadosEntrega15851625776177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE 
            "${DatabaseTables.PEDIDO_DADOS_ENTREGA}" 
            ("id" SERIAL NOT NULL
            , "nomeRecebedor" character varying(45) NOT NULL
            , "logradouro" character varying(150) NOT NULL
            , "complemento" character varying(150) NULL
            , "cep" character varying(8) NOT NULL
            , "nomeCidade" character varying(150) NOT NULL
            , "siglaUf" character varying(2) NOT NULL
            , "telefone" character varying(16) NOT NULL
            , "email" character varying(100) NOT NULL
            , "valorFrete" NUMERIC(10,2) NOT NULL
            , "transportadoraFreteId" INTEGER NOT NULL
            , CONSTRAINT "PK_id_pedidoDadosEntrega" PRIMARY KEY ("id"))
        `);

        await queryRunner.query(`
            ALTER TABLE 
            "${DatabaseTables.PEDIDO_DADOS_ENTREGA}" 
            ADD CONSTRAINT "FK_transportadoraFreteId_transportadoraFrete" 
                FOREIGN KEY ("transportadoraFreteId") 
                REFERENCES "${DatabaseTables.TRANSPORTADORA_FRETE}"("id") 
            ON DELETE RESTRICT
            ON UPDATE CASCADE
        `);

        await queryRunner.query(`
            CREATE INDEX 
            "IDX_pedidoDadosEntrega_Id" ON "${DatabaseTables.PEDIDO_DADOS_ENTREGA}" ("id")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "${DatabaseTables.PEDIDO_DADOS_ENTREGA}";
        `);

        await queryRunner.query(`
            DROP TABLE "${DatabaseTables.PEDIDO_DADOS_ENTREGA}";
        `);
    }
}