import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";

export class usuarioRegistroPedido15851625776163 implements MigrationInterface {
    name = 'usuarioRegistroPedido15851625776163';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO
                "${DatabaseTables.USUARIO_ADMIN}"
                (
                    "id"
                    ,"nomeUsuario"
                    ,"senha"
                    ,"nome"
                    ,"necessarioAlteracaoSenha"
                    ,"ativo"
                    ,"dataCriacao"
                    ,"dataAtualizacao"
                )
                VALUES
                (
                    0,
                    'loja_appWeb'
                    ,'loja_appWeb'
                    ,'Loja App Web'
                    ,false
                    ,true
                    ,'2020-03-23T22:31:26+00:00'
                    ,'2020-03-23T22:31:26+00:00'
                );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "${DatabaseTables.USUARIO_ADMIN}" WHERE "id" = 0
        `);
    }
}