

import { MigrationInterface, QueryRunner } from "typeorm";
import { TabelasBancoDados } from "../../../../0-core/infra/dados/tabelas-banco-dados.app";

export class pedidoDadosEntrega15851625776177 implements MigrationInterface {
    name = 'pedidoDadosEntrega15851625776177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE 
            "${TabelasBancoDados.PEDIDO_DADOS_ENTREGA}" 
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
            "${TabelasBancoDados.PEDIDO_DADOS_ENTREGA}" 
            ADD CONSTRAINT "FK_transportadoraFreteId_transportadoraFrete" 
                FOREIGN KEY ("transportadoraFreteId") 
                REFERENCES "${TabelasBancoDados.TRANSPORTADORA_FRETE}"("id") 
            ON DELETE RESTRICT
            ON UPDATE CASCADE
        `);

        await queryRunner.query(`
            CREATE INDEX 
            "IDX_pedidoDadosEntrega_Id" ON "${TabelasBancoDados.PEDIDO_DADOS_ENTREGA}" ("id")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "${TabelasBancoDados.PEDIDO_DADOS_ENTREGA}";
        `);

        await queryRunner.query(`
            DROP TABLE "${TabelasBancoDados.PEDIDO_DADOS_ENTREGA}";
        `);
    }
}