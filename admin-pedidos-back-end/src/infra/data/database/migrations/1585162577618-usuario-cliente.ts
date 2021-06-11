import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";

export class usuariocliente1585162577618 implements MigrationInterface {
    name = 'usuariocliente1585162577618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE 
                "${DatabaseTables.USUARIO_CLIENTE}" 
                ("id" SERIAL NOT NULL
                , "nomeUsuario" character varying(20) NOT NULL
                , "senha" character varying(100) NOT NULL
                , "nome" character varying(45) NOT NULL
                , "ativo" boolean NOT NULL
                , "clienteId" integer NOT NULL
                , "dataCriacao" TIMESTAMP NOT NULL
                , "dataAtualizacao" TIMESTAMP NOT NULL
                , CONSTRAINT "PK_id_usuarioCliente" PRIMARY KEY ("id"))
        `);

        await queryRunner.query(`
            ALTER TABLE 
            "${DatabaseTables.USUARIO_CLIENTE}" 
            ADD CONSTRAINT "FK_clienteId_cliente" 
                FOREIGN KEY ("clienteId") 
                REFERENCES "${DatabaseTables.CLIENTE}"("id") 
            ON DELETE RESTRICT 
            ON UPDATE RESTRICT
        `);

        await queryRunner.query(`
            CREATE INDEX 
            "IDX_usuarioCliente_Id" ON "${DatabaseTables.USUARIO_CLIENTE}" ("id")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "IDX_usuarioCliente_Id";
        `);

        await queryRunner.query(`
            DROP TABLE "${DatabaseTables.USUARIO_CLIENTE}";
        `);
    }
}
