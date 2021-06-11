import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";

export class tiposProduto15851625776165 implements MigrationInterface {
    name = 'tiposProduto15851625776165';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE "${DatabaseTables.TIPO_PRODUTO}" SET "descricao" = 'Fardamento' WHERE "id" = 1;
        `);

        await queryRunner.query(`
            INSERT INTO "${DatabaseTables.TIPO_PRODUTO}"
            (
                id
                ,descricao
                ,ativo
                ,"dataCriacao"
                ,"dataAtualizacao"
            )
            VALUES
            (
                2,
                'Metais',
                true,
                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            ),
            (
                3,
                'Sapatos / Coturnos',
                true,
                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            ),
            (
                4,
                'Bordados Em Geral',
                true,
                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            ),
            (
                5,
                'Emborrachados',
                true,
                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            ),
            (
                6,
                'Cintos',
                true,
                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            ),
            (
                7,
                'Acessórios',
                true,
                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            ),
            (
                8,
                'Camisetas / Shorts',
                true,
                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE "${DatabaseTables.TIPO_PRODUTO}" SET "descricao" = 'Outros' WHERE "id" = 1;
        `);

        await queryRunner.query(`
            DELETE FROM "${DatabaseTables.TIPO_PRODUTO}" WHERE "id" > 1
        `);
    }
}