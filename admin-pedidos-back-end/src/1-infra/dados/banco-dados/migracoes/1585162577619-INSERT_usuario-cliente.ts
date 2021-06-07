import { MigrationInterface, QueryRunner } from "typeorm";
import { TabelasBancoDados } from "../../../../0-core/infra/dados/tabelas-banco-dados.app";

export class INSERTusuariocliente1585162577619 implements MigrationInterface {
    name = 'INSERTusuariocliente1585162577619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "${TabelasBancoDados.USUARIO_CLIENTE}"
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
            DELETE FROM "${TabelasBancoDados.USUARIO_CLIENTE}" WHERE "id" = '1'
        `);
    }
}
