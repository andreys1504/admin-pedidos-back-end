import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";

export class transportadoraFrete15851625776176 implements MigrationInterface {
    name = 'transportadoraFrete15851625776176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "${DatabaseTables.TRANSPORTADORA_FRETE}"
            ("id" integer NOT NULL
            , "descricao" character varying(45) NOT NULL
            , "ativo" boolean NOT NULL
            , "dataCriacao" TIMESTAMP NOT NULL
            , "dataAtualizacao" TIMESTAMP NOT NULL
            , CONSTRAINT "PK_idTransportadoraFrete" PRIMARY KEY ("id"))
        `);

        await queryRunner.query(`
            CREATE INDEX 
            "IDX_transportadoraFrete_Id" ON "${DatabaseTables.TRANSPORTADORA_FRETE}" ("id")
        `);

        await queryRunner.query(`
            INSERT INTO "${DatabaseTables.TRANSPORTADORA_FRETE}"
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
                'Correios',
                true,

                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "${DatabaseTables.TRANSPORTADORA_FRETE}";
        `);

        await queryRunner.query(`
            DROP TABLE "${DatabaseTables.TRANSPORTADORA_FRETE}";
        `);
    }
}
