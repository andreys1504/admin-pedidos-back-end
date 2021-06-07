import { MigrationInterface, QueryRunner } from "typeorm";
import { TabelasBancoDados } from "../../../../0-core/infra/dados/tabelas-banco-dados.app";

export class tipoProduto15851625776162 implements MigrationInterface {
    name = 'tipoProduto15851625776162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "${TabelasBancoDados.TIPO_PRODUTO}"
            ("id" integer NOT NULL
            , "descricao" character varying(45) NOT NULL
            , "ativo" boolean NOT NULL
            , "dataCriacao" TIMESTAMP NOT NULL
            , "dataAtualizacao" TIMESTAMP NOT NULL
            , CONSTRAINT "PK_idTipoProduto" PRIMARY KEY ("id"))
        `);

        await queryRunner.query(`
            CREATE INDEX 
            "IDX_tipoProduto_Id" ON "${TabelasBancoDados.TIPO_PRODUTO}" ("id")
        `);

        await queryRunner.query(`
            INSERT INTO "${TabelasBancoDados.TIPO_PRODUTO}"
            (
                id
                ,descricao
                ,ativo
                ,"dataCriacao"
                ,"dataAtualizacao"
            )
            VALUES
            (
                1,
                'Outros',
                true,

                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            );
        `);

        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.PRODUTO}"
            ADD COLUMN "${TabelasBancoDados.TIPO_PRODUTO}Id" INT NOT NULL DEFAULT 1;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "${TabelasBancoDados.TIPO_PRODUTO}" 
            DROP COLUMN "${TabelasBancoDados.TIPO_PRODUTO}Id";
        `);

        await queryRunner.query(`
            DROP TABLE "${TabelasBancoDados.TIPO_PRODUTO}";
        `);
    }
}
