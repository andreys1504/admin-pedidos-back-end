import { MigrationInterface, QueryRunner } from "typeorm";
import { TabelasBancoDados } from "../../../../0-core/infra/dados/tabelas-banco-dados.app";

export class produtoImagens15851625776181 implements MigrationInterface {
    name = 'produtoImagens15851625776181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "${TabelasBancoDados.PRODUTO_IMAGENS}"
            ("id" SERIAL NOT NULL
            , "nomeArquivo" character varying(500) NOT NULL
            , "produtoId" INTEGER NOT NULL
            , CONSTRAINT "PK_produtoImagens" PRIMARY KEY ("id"))
        `);

        await queryRunner.query(`
            CREATE INDEX 
            "IDX_produtoImagens_Id" ON "${TabelasBancoDados.PRODUTO_IMAGENS}" ("id")
        `);

        await queryRunner.query(`
            ALTER TABLE 
            "${TabelasBancoDados.PRODUTO_IMAGENS}" 
            ADD CONSTRAINT "FK_produto_produtoImagens" 
                FOREIGN KEY ("produtoId") 
                REFERENCES "${TabelasBancoDados.PRODUTO}"("id") 
            ON DELETE CASCADE
            ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "${TabelasBancoDados.PRODUTO_IMAGENS}";
        `);
    }
}
