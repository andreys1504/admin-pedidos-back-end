import { MigrationInterface, QueryRunner } from "typeorm";
import { TabelasBancoDados } from "../../../../0-core/infra/dados/tabelas-banco-dados.app";

export class v1app1585162577432 implements MigrationInterface {
    name = 'v1app1585162577432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        //TIPO_PEDIDO
        await queryRunner.query(`
            CREATE TABLE 
            "${TabelasBancoDados.TIPO_PEDIDO}" 
            ("id" integer NOT NULL
            , "descricao" character varying(45) NOT NULL
            , "ativo" boolean NOT NULL
            , "dataCriacao" TIMESTAMP NOT NULL
            , "dataAtualizacao" TIMESTAMP NOT NULL
            , CONSTRAINT "PK_idTipoPedido" PRIMARY KEY ("id"))`, undefined);

        await queryRunner.query(`
            CREATE INDEX 
            "IDX_tipoPedido_Id" ON "${TabelasBancoDados.TIPO_PEDIDO}" ("id")`, undefined);


        //SITUACAO_EXTERNA_ITEM_PEDIDO
        await queryRunner.query(`
            CREATE TABLE 
            "${TabelasBancoDados.SITUACAO_EXTERNA_ITEM_PEDIDO}" 
            ("id" integer NOT NULL
            , "descricao" character varying(45) NOT NULL
            , "ativo" boolean NOT NULL
            , "dataCriacao" TIMESTAMP NOT NULL
            , "dataAtualizacao" TIMESTAMP NOT NULL
            , CONSTRAINT "PK_id_situacaoExternaItemPedido" PRIMARY KEY ("id"))`, undefined);

        await queryRunner.query(`
            CREATE INDEX 
            "IDX_situacaoExternaItemPedido_Id" ON "${TabelasBancoDados.SITUACAO_EXTERNA_ITEM_PEDIDO}" ("id")`, undefined);


        //PRODUTO
        await queryRunner.query(`
            CREATE TABLE 
            "${TabelasBancoDados.PRODUTO}" 
            ("id" SERIAL NOT NULL
            , "descricao" character varying(45) NOT NULL
            , "ativo" boolean NOT NULL
            , "valorUnitario" numeric(10,2) NOT NULL
            , "dataCriacao" TIMESTAMP NOT NULL
            , "dataAtualizacao" TIMESTAMP NOT NULL
            , CONSTRAINT "PK_idProduto" PRIMARY KEY ("id"))`);

        await queryRunner.query(`
            CREATE INDEX 
            "IDX_produto_Id" ON "${TabelasBancoDados.PRODUTO}" ("id")`, undefined);


        //TIPO_CLIENTE
        await queryRunner.query(`
            CREATE TABLE 
            "${TabelasBancoDados.TIPO_CLIENTE}" 
            ("id" integer NOT NULL
            , "descricao" character varying(45) NOT NULL
            , "ativo" boolean NOT NULL
            , "dataCriacao" TIMESTAMP NOT NULL
            , "dataAtualizacao" TIMESTAMP NOT NULL
            , CONSTRAINT "PK_idTipoCliente" PRIMARY KEY ("id"))
        `);

        await queryRunner.query(`
            CREATE INDEX 
            "IDX_tipoCliente_Id" ON "${TabelasBancoDados.TIPO_CLIENTE}" ("id")
        `);


        //PERMISSAO_ACESSO
        await queryRunner.query(`
            CREATE TABLE 
            "${TabelasBancoDados.PERMISSAO_ACESSO}" 
            ("id" SERIAL NOT NULL
            , "descricao" character varying(75) NOT NULL
            , "chave" character varying(60) NOT NULL
            , "dataCriacao" TIMESTAMP NOT NULL
            , "dataAtualizacao" TIMESTAMP NOT NULL
            , CONSTRAINT "PK_id_permissaoAcesso" PRIMARY KEY ("id"))
        `);

        await queryRunner.query(`
            CREATE INDEX 
            "IDX_permissaoAcesso_Id" ON "${TabelasBancoDados.PERMISSAO_ACESSO}" ("id")
        `);


        //USUARIO
        await queryRunner.query(`
            CREATE TABLE 
            "usuario" 
            ("id" SERIAL NOT NULL
            , "nomeUsuario" character varying(20) NOT NULL
            , "senha" character varying(100) NOT NULL
            , "nome" character varying(45) NOT NULL
            , "necessarioAlteracaoSenha" boolean NOT NULL
            , "ativo" boolean NOT NULL
            , "dataCriacao" TIMESTAMP NOT NULL
            , "dataAtualizacao" TIMESTAMP NOT NULL
            , CONSTRAINT "PK_id_usuario" PRIMARY KEY ("id"))
        `);

        await queryRunner.query(`
            CREATE INDEX 
            "IDX_usuario_Id" ON "usuario" ("id")
        `);


        //SITUACAO_EXTERNA_PEDIDO
        await queryRunner.query(`
            CREATE TABLE 
            "${TabelasBancoDados.SITUACAO_EXTERNA_PEDIDO}" 
            ("id" integer NOT NULL
            , "descricao" character varying(45) NOT NULL
            , "ativo" boolean NOT NULL
            , "dataCriacao" TIMESTAMP NOT NULL
            , "dataAtualizacao" TIMESTAMP NOT NULL
            , CONSTRAINT "PK_id_situacaoExternaPedido" PRIMARY KEY ("id"))
        `);

        await queryRunner.query(`
            CREATE INDEX 
            "IDX_situacaoExternaPedido_Id" ON "${TabelasBancoDados.SITUACAO_EXTERNA_PEDIDO}" ("id")
        `);


        //TIPO_PAGAMENTO_PEDIDO
        await queryRunner.query(`
            CREATE TABLE 
            "${TabelasBancoDados.TIPO_PAGAMENTO_PEDIDO}" 
            ("id" integer NOT NULL
            , "descricao" character varying(45) NOT NULL
            , "ativo" boolean NOT NULL
            , "dataCriacao" TIMESTAMP NOT NULL
            , "dataAtualizacao" TIMESTAMP NOT NULL
            , CONSTRAINT "PK_id_tipoPagamentoPedido" PRIMARY KEY ("id"))
        `);

        await queryRunner.query(`
            CREATE INDEX 
            "IDX_tipoPagamentoPedido_Id" ON "${TabelasBancoDados.TIPO_PAGAMENTO_PEDIDO}" ("id")
        `);


        //SITUACAO_INTERNA_ITEM_PEDIDO
        await queryRunner.query(`
            CREATE TABLE 
            "${TabelasBancoDados.SITUACAO_INTERNA_ITEM_PEDIDO}" 
            ("id" integer NOT NULL
            , "descricao" character varying(45) NOT NULL
            , "ativo" boolean NOT NULL
            , "dataCriacao" TIMESTAMP NOT NULL
            , "dataAtualizacao" TIMESTAMP NOT NULL
            , CONSTRAINT "PK_id_situacaoInternaItemPedido" PRIMARY KEY ("id"))
        `);

        await queryRunner.query(`
            CREATE INDEX 
            "IDX_situacaoInternaItemPedido_Id" ON "${TabelasBancoDados.SITUACAO_INTERNA_ITEM_PEDIDO}" ("id")
        `);


        //CLIENTE
        await queryRunner.query(`
            CREATE TABLE 
            "${TabelasBancoDados.CLIENTE}" 
            ("id" SERIAL NOT NULL
            , "nome" character varying(45) NOT NULL
            , "nomeGuerra" character varying(45) NOT NULL
            , "cpfCnpj" character varying(14) NOT NULL
            , "logradouro" character varying(150) NOT NULL
            , "cep" character varying(8) NOT NULL
            , "nomeCidade" character varying(150) NOT NULL
            , "siglaUf" character varying(2) NOT NULL
            , "telefone" character varying(16) NOT NULL
            , "email" character varying(100) NOT NULL
            , "tipoClienteId" integer NOT NULL
            , "dataCriacao" TIMESTAMP NOT NULL
            , "dataAtualizacao" TIMESTAMP NOT NULL
            , "tipoSanguineo" character varying(10) NULL
            , CONSTRAINT "PK_id_cliente" PRIMARY KEY ("id"))
        `);

        await queryRunner.query(`
            ALTER TABLE 
            "${TabelasBancoDados.CLIENTE}" 
            ADD CONSTRAINT "FK_tipoClienteId_tipoCliente" 
                FOREIGN KEY ("tipoClienteId") 
                REFERENCES "${TabelasBancoDados.TIPO_CLIENTE}"("id") 
            ON DELETE RESTRICT
            ON UPDATE CASCADE
        `);

        await queryRunner.query(`
            CREATE INDEX 
            "IDX_cliente_Id" ON "${TabelasBancoDados.CLIENTE}" ("id")
        `);


        //PEDIDO
        await queryRunner.query(`
            CREATE TABLE 
            "${TabelasBancoDados.PEDIDO}" 
            ("id" SERIAL NOT NULL
            , "dataEmissaoPedido" date NOT NULL
            , "usuarioId" integer NOT NULL
            , "situacaoExternaPedidoId" integer NOT NULL
            , "tipoPagamentoPedidoId" integer NULL
            , "clienteId" integer NOT NULL
            , "dataCriacao" TIMESTAMP NOT NULL
            , "dataAtualizacao" TIMESTAMP NOT NULL
            , "dataPrevisaoEntrega" DATE NULL
            , "tamanhoItensPedido" TEXT NULL
            , "dataFinalizacaoPedido" DATE NULL
            , "tipoPedidoId" INTEGER NOT NULL
            , CONSTRAINT "PK_id_pedido" PRIMARY KEY ("id"))
        `);

        await queryRunner.query(`
            ALTER TABLE 
            "${TabelasBancoDados.PEDIDO}" 
            ADD CONSTRAINT "FK_tipoPedidoId_pedido" 
                FOREIGN KEY ("tipoPedidoId") 
                REFERENCES "${TabelasBancoDados.TIPO_PEDIDO}"("id") 
            ON DELETE RESTRICT 
            ON UPDATE RESTRICT
        `);

        await queryRunner.query(`
            ALTER TABLE 
            "${TabelasBancoDados.PEDIDO}" 
            ADD CONSTRAINT "FK_usuarioId_pedido" 
                FOREIGN KEY ("usuarioId") 
                REFERENCES "usuario"("id") 
            ON DELETE RESTRICT
            ON UPDATE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE 
            "${TabelasBancoDados.PEDIDO}" 
            ADD CONSTRAINT "FK_situacaoExternaPedidoId_pedido" 
                FOREIGN KEY ("situacaoExternaPedidoId") 
                REFERENCES "${TabelasBancoDados.SITUACAO_EXTERNA_PEDIDO}"("id") 
            ON DELETE RESTRICT 
            ON UPDATE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE 
            "${TabelasBancoDados.PEDIDO}" 
            ADD CONSTRAINT "FK_tipoPagamentoId_tipoPagamento" 
                FOREIGN KEY ("tipoPagamentoPedidoId") 
                REFERENCES "${TabelasBancoDados.TIPO_PAGAMENTO_PEDIDO}"("id") 
            ON DELETE RESTRICT 
            ON UPDATE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE 
            "${TabelasBancoDados.PEDIDO}" 
            ADD CONSTRAINT "FK_clienteId_cliente" 
                FOREIGN KEY ("clienteId") 
                REFERENCES "${TabelasBancoDados.CLIENTE}"("id") 
            ON DELETE RESTRICT 
            ON UPDATE CASCADE
        `);

        await queryRunner.query(`
            CREATE INDEX 
            "IDX_pedido_Id" ON "${TabelasBancoDados.PEDIDO}" ("id")
        `);


        //PEDIDO_ITEM
        await queryRunner.query(`
            CREATE TABLE 
            "${TabelasBancoDados.PEDIDO_ITEM}" 
            ("id" SERIAL NOT NULL
            , "pedidoId" integer NOT NULL
            , "quantidade" integer NOT NULL
            , "valorUnitario" NUMERIC(10,2) NOT NULL
            , "dataAtualizacao" TIMESTAMP NOT NULL
            , "situacaoInternaItemPedidoId" integer NOT NULL
            , "produtoId" INTEGER NOT NULL
            , "situacaoExternaItemPedidoId" INTEGER NOT NULL
            , "valorTotal" NUMERIC(10,2) NOT NULL
            , CONSTRAINT "PK_id_pedidoItem" PRIMARY KEY ("id"))
        `);

        await queryRunner.query(`
            ALTER TABLE 
            "${TabelasBancoDados.PEDIDO_ITEM}" 
            ADD CONSTRAINT "FK_situacaoExternaItemPedidoId_pedidoItem" 
                FOREIGN KEY ("situacaoExternaItemPedidoId") 
                REFERENCES "${TabelasBancoDados.SITUACAO_EXTERNA_ITEM_PEDIDO}"("id") 
            ON DELETE RESTRICT 
            ON UPDATE RESTRICT
        `);

        await queryRunner.query(`
            ALTER TABLE 
            "${TabelasBancoDados.PEDIDO_ITEM}" 
            ADD CONSTRAINT "FK_pedidoId_pedidoItem" 
            FOREIGN KEY ("pedidoId") 
            REFERENCES "${TabelasBancoDados.PEDIDO}"("id") 
            ON DELETE CASCADE 
            ON UPDATE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE 
            "${TabelasBancoDados.PEDIDO_ITEM}" 
            ADD CONSTRAINT "FK_situacaoInternaItemPedidoId_pedidoItem" 
                FOREIGN KEY ("situacaoInternaItemPedidoId") 
                REFERENCES "${TabelasBancoDados.SITUACAO_INTERNA_ITEM_PEDIDO}"("id") 
            ON DELETE CASCADE 
            ON UPDATE RESTRICT
        `);

        await queryRunner.query(`
            ALTER TABLE 
            "${TabelasBancoDados.PEDIDO_ITEM}" 
            ADD CONSTRAINT "FK_produtoId_pedidoItem" 
                FOREIGN KEY ("produtoId") 
                REFERENCES "${TabelasBancoDados.PRODUTO}"("id") 
            ON DELETE RESTRICT
            ON UPDATE CASCADE
        `);

        await queryRunner.query(`
            CREATE INDEX 
            "IDX_pedidoItem_Id" ON "${TabelasBancoDados.PEDIDO_ITEM}" ("id")
        `);


        //USUARIO_PERMISSOES
        await queryRunner.query(`
            CREATE TABLE 
            "${TabelasBancoDados.USUARIO_PERMISSOES}" 
            ("usuarioId" integer NOT NULL
            , "permissaoAcessoId" integer NOT NULL
            , CONSTRAINT "PK_id_usuarioPermissoesAcesso" PRIMARY KEY ("usuarioId", "permissaoAcessoId"))
        `);

        await queryRunner.query(`
            ALTER TABLE 
            "${TabelasBancoDados.USUARIO_PERMISSOES}" 
            ADD CONSTRAINT "FK_usuarioId_usuarioPermissoesAcesso" 
                FOREIGN KEY ("usuarioId") 
                REFERENCES "usuario"("id") 
            ON DELETE CASCADE 
            ON UPDATE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE 
            "${TabelasBancoDados.USUARIO_PERMISSOES}" 
            ADD CONSTRAINT "FK_permissaoAcessoId_usuarioPermissoesAcesso" 
                FOREIGN KEY ("permissaoAcessoId") 
                REFERENCES "${TabelasBancoDados.PERMISSAO_ACESSO}"("id") 
            ON DELETE CASCADE 
            ON UPDATE CASCADE
        `);

        await queryRunner.query(`
            CREATE INDEX 
            "IDX_usuarioPermissoesAcesso_usuarioId" ON "${TabelasBancoDados.USUARIO_PERMISSOES}" ("usuarioId")
        `);

        await queryRunner.query(`
            CREATE INDEX 
            "IDX_usuarioPermissoesAcesso_permissaoAcessoId" ON "${TabelasBancoDados.USUARIO_PERMISSOES}" ("permissaoAcessoId")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "pedidoItem"
        `);

        await queryRunner.query(`
            DROP TABLE "pedido"
        `);

        await queryRunner.query(`
            DROP TABLE "usuarioPermissoesAcesso"
        `);

        await queryRunner.query(`
            DROP TABLE "permissaoAcesso"
        `);

        await queryRunner.query(`
            DROP TABLE "cliente"
        `);

        await queryRunner.query(`
            DROP TABLE "produto"
        `);

        await queryRunner.query(`
            DROP TABLE "usuario"
        `);

        await queryRunner.query(`
            DROP TABLE "situacaoExternaItemPedido"
        `);

        await queryRunner.query(`
            DROP TABLE "situacaoExternaPedido"
        `);

        await queryRunner.query(`
            DROP TABLE "situacaoInternaItemPedido"
        `);

        await queryRunner.query(`
            DROP TABLE "tipoCliente"
        `);

        await queryRunner.query(`
            DROP TABLE "tipoPagamentoPedido"
        `);

        await queryRunner.query(`
            DROP TABLE "tipoPedido"
        `);
    }
}
