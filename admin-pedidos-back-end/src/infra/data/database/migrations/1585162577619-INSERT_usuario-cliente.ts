import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";

export class INSERTusuariocliente1585162577619 implements MigrationInterface {
    name = 'INSERTusuariocliente1585162577619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "${DatabaseTables.USUARIO_CLIENTE}"
            (
                "nomeUsuario"
                ,"senha"
                ,"nome"
                ,"ativo"
                ,"clienteId"
                ,"dataCriacao"
                ,"dataAtualizacao"
            )
            VALUES
            (
                'andreys1504'
                ,'284baeea16e367996a067aa1db9ed100'
                ,'andrey mariano'
                , true
                , '1'
                , '2020-03-23T22:31:26+00:00'
                , '2020-03-23T22:31:26+00:00'
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "${DatabaseTables.USUARIO_CLIENTE}" WHERE "id" = '1'
        `);
    }
}
