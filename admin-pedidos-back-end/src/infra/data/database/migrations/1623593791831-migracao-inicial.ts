import {MigrationInterface, QueryRunner} from "typeorm";

export class migracaoInicial1623593791831 implements MigrationInterface {
    name = 'migracaoInicial1623593791831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tipoCliente" ("id" integer NOT NULL, "descricao" character varying(45) NOT NULL, "ativo" boolean NOT NULL, "dataCriacao" TIMESTAMP NOT NULL, "dataAtualizacao" TIMESTAMP NOT NULL, CONSTRAINT "PK_4d3ef48e62b864b7340cd26819f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissaoAcesso" ("id" SERIAL NOT NULL, "descricao" character varying(75) NOT NULL, "chave" character varying(60) NOT NULL, "dataCriacao" TIMESTAMP NOT NULL, "dataAtualizacao" TIMESTAMP NOT NULL, CONSTRAINT "PK_3315c99e69149aa5379a6b315ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarioAdmin" ("id" SERIAL NOT NULL, "nomeUsuario" character varying(20) NOT NULL, "senha" character varying(20) NOT NULL, "nome" character varying(45) NOT NULL, "necessarioAlteracaoSenha" boolean NOT NULL, "ativo" boolean NOT NULL, "dataCriacao" TIMESTAMP NOT NULL, "dataAtualizacao" TIMESTAMP NOT NULL, CONSTRAINT "PK_1bb7793856b1a5410ca3080b2eb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "situacaoExternaPedido" ("id" integer NOT NULL, "descricao" character varying(45) NOT NULL, "ativo" boolean NOT NULL, "dataCriacao" TIMESTAMP NOT NULL, "dataAtualizacao" TIMESTAMP NOT NULL, CONSTRAINT "PK_51b7aa64925a39260dd01d1cb80" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tipoPagamentoPedido" ("id" integer NOT NULL, "descricao" character varying(45) NOT NULL, "ativo" boolean NOT NULL, "dataCriacao" TIMESTAMP NOT NULL, "dataAtualizacao" TIMESTAMP NOT NULL, CONSTRAINT "PK_29c1102885c96db7e17e5dfec27" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tipoProduto" ("id" integer NOT NULL, "descricao" character varying(45) NOT NULL, "ativo" boolean NOT NULL, "dataCriacao" TIMESTAMP NOT NULL, "dataAtualizacao" TIMESTAMP NOT NULL, CONSTRAINT "PK_08ca076fb65418f5ac9f54c6040" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produtoImagens" ("id" SERIAL NOT NULL, "nomeArquivo" character varying(500) NOT NULL, "produtoId" integer NOT NULL, "imagemDestaque" boolean NOT NULL, CONSTRAINT "PK_e5d155ca704cc5388c6abc404f7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produto" ("id" SERIAL NOT NULL, "descricao" character varying(150) NOT NULL, "ativo" boolean NOT NULL, "valorUnitario" numeric NOT NULL, "tipoProdutoId" integer NOT NULL, "detalhesProduto" text NOT NULL, "destaqueTelaPrincipal" boolean NOT NULL, "dataCriacao" TIMESTAMP NOT NULL, "dataAtualizacao" TIMESTAMP NOT NULL, CONSTRAINT "PK_99c4351f9168c50c0736e6a66be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "situacaoInternaItemPedido" ("id" integer NOT NULL, "descricao" character varying(45) NOT NULL, "ativo" boolean NOT NULL, "dataCriacao" TIMESTAMP NOT NULL, "dataAtualizacao" TIMESTAMP NOT NULL, CONSTRAINT "PK_f5b701880dc27658a944f969c89" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "situacaoExternaItemPedido" ("id" integer NOT NULL, "descricao" character varying(45) NOT NULL, "ativo" boolean NOT NULL, "dataCriacao" TIMESTAMP NOT NULL, "dataAtualizacao" TIMESTAMP NOT NULL, CONSTRAINT "PK_0c4e086ccf09290ed48834c1aa6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pedidoItem" ("id" SERIAL NOT NULL, "pedidoId" integer NOT NULL, "produtoId" integer NOT NULL, "quantidade" integer NOT NULL, "situacaoInternaItemPedidoId" integer NOT NULL, "valorUnitario" numeric NOT NULL, "situacaoExternaItemPedidoId" integer NOT NULL, "valorTotal" numeric NOT NULL, "nomeFuncionarioResponsavel" character varying(45) NOT NULL, "dataAtualizacao" TIMESTAMP NOT NULL, CONSTRAINT "PK_2ac0fca798988510205d8fb61e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tipoPedido" ("id" integer NOT NULL, "descricao" character varying(45) NOT NULL, "ativo" boolean NOT NULL, "dataCriacao" TIMESTAMP NOT NULL, "dataAtualizacao" TIMESTAMP NOT NULL, CONSTRAINT "PK_3d9ac9366d165283261e2c5cc4b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transportadoraFrete" ("id" integer NOT NULL, "descricao" character varying(75) NOT NULL, "ativo" boolean NOT NULL, "dataCriacao" TIMESTAMP NOT NULL, "dataAtualizacao" TIMESTAMP NOT NULL, CONSTRAINT "PK_134da5fb5fa8d141692fd522663" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pedidoDadosEntrega" ("id" SERIAL NOT NULL, "pedidoId" integer NOT NULL, "nomeRecebedor" character varying(45) NOT NULL, "logradouro" character varying(150) NOT NULL, "complemento" character varying(150) NOT NULL, "cep" character varying(8) NOT NULL, "nomeCidade" character varying(150) NOT NULL, "siglaUf" character varying(2) NOT NULL, "telefone" character varying(16) NOT NULL, "email" character varying(100) NOT NULL, "descricaoFrete" character varying(150) NOT NULL, "valorFrete" numeric NOT NULL, "transportadoraFreteId" integer NOT NULL, CONSTRAINT "REL_4c4c9b61e3caa60a3bf670377f" UNIQUE ("pedidoId"), CONSTRAINT "PK_07dee4ecee4bcf3aa74c97d8207" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pedido" ("id" SERIAL NOT NULL, "id2" character varying NOT NULL, "dataEmissaoPedido" date NOT NULL, "usuarioRegistroPedidoId" integer NOT NULL, "situacaoExternaPedidoId" integer NOT NULL, "tipoPagamentoPedidoId" integer NOT NULL, "clienteId" integer NOT NULL, "tipoPedidoId" integer NOT NULL, "dataPrevisaoEntrega" date, "observacoes" text NOT NULL, "dataFinalizacaoPedido" date, "usuarioResponsavelPedidoId" integer NOT NULL, "receberPedidoResidencia" boolean NOT NULL, "observacaoCliente" text NOT NULL, "pedidoRealizadoLojaVirtual" boolean NOT NULL, "idPedidoEmSistemaPagamentoExterno" character varying NOT NULL, "dataCriacao" TIMESTAMP NOT NULL, "dataAtualizacao" TIMESTAMP NOT NULL, CONSTRAINT "PK_af8d8b3d07fae559c37f56b3f43" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cliente" ("id" SERIAL NOT NULL, "nome" character varying(45) NOT NULL, "tipoClienteId" integer NOT NULL, "cpfCnpj" character varying(14) NOT NULL, "logradouro" character varying(150) NOT NULL, "cep" character varying(8) NOT NULL, "nomeCidade" character varying(150) NOT NULL, "siglaUf" character varying(2) NOT NULL, "telefone" character varying(16) NOT NULL, "email" character varying(100) NOT NULL, "observacoes" text NOT NULL, "dataCriacao" TIMESTAMP NOT NULL, "dataAtualizacao" TIMESTAMP NOT NULL, CONSTRAINT "PK_18990e8df6cf7fe71b9dc0f5f39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarioPermissoesAcesso" ("usuarioAdminId" integer NOT NULL, "permissaoAcessoId" integer NOT NULL, CONSTRAINT "PK_1283d1b5015e311f88274e98cf1" PRIMARY KEY ("usuarioAdminId", "permissaoAcessoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_20070c1f6c47a54b0d5132dd9e" ON "usuarioPermissoesAcesso" ("usuarioAdminId") `);
        await queryRunner.query(`CREATE INDEX "IDX_11be84315fe02dddd87bb96d99" ON "usuarioPermissoesAcesso" ("permissaoAcessoId") `);
        await queryRunner.query(`ALTER TABLE "produtoImagens" ADD CONSTRAINT "FK_c3ebf6c9807d07513f222d903b9" FOREIGN KEY ("produtoId") REFERENCES "produto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produto" ADD CONSTRAINT "FK_155be8b724dc1fa07d62ed12342" FOREIGN KEY ("tipoProdutoId") REFERENCES "tipoProduto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedidoItem" ADD CONSTRAINT "FK_b0ac2c6863ccd97d636612dddd0" FOREIGN KEY ("pedidoId") REFERENCES "pedido"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pedidoItem" ADD CONSTRAINT "FK_2c2adffb2fde19b7091753534ef" FOREIGN KEY ("produtoId") REFERENCES "produto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedidoItem" ADD CONSTRAINT "FK_3ab82d3bbf59be77eb05f760aa6" FOREIGN KEY ("situacaoInternaItemPedidoId") REFERENCES "situacaoInternaItemPedido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedidoItem" ADD CONSTRAINT "FK_cdf10081da221202f8385843276" FOREIGN KEY ("situacaoExternaItemPedidoId") REFERENCES "situacaoExternaItemPedido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedidoDadosEntrega" ADD CONSTRAINT "FK_4c4c9b61e3caa60a3bf670377fa" FOREIGN KEY ("pedidoId") REFERENCES "pedido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedidoDadosEntrega" ADD CONSTRAINT "FK_d590af97fa66efdac39d10d3213" FOREIGN KEY ("transportadoraFreteId") REFERENCES "transportadoraFrete"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_706ba2048b661d7b112dadcc159" FOREIGN KEY ("usuarioRegistroPedidoId") REFERENCES "usuarioAdmin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_aaf1805669af8c7309583ffe365" FOREIGN KEY ("situacaoExternaPedidoId") REFERENCES "situacaoExternaPedido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_cadc6e9f0e7fcf37857190db649" FOREIGN KEY ("tipoPagamentoPedidoId") REFERENCES "tipoPagamentoPedido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_2730a0c3947641edf256551f10c" FOREIGN KEY ("clienteId") REFERENCES "cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_ec23de9a7f08d4f71c535268ca8" FOREIGN KEY ("tipoPedidoId") REFERENCES "tipoPedido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_64db587949d301cbde4bc65d73a" FOREIGN KEY ("usuarioResponsavelPedidoId") REFERENCES "usuarioAdmin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cliente" ADD CONSTRAINT "FK_ab7f7d4db71df2cf210dde9002c" FOREIGN KEY ("tipoClienteId") REFERENCES "tipoCliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuarioPermissoesAcesso" ADD CONSTRAINT "FK_20070c1f6c47a54b0d5132dd9eb" FOREIGN KEY ("usuarioAdminId") REFERENCES "usuarioAdmin"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "usuarioPermissoesAcesso" ADD CONSTRAINT "FK_11be84315fe02dddd87bb96d995" FOREIGN KEY ("permissaoAcessoId") REFERENCES "permissaoAcesso"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarioPermissoesAcesso" DROP CONSTRAINT "FK_11be84315fe02dddd87bb96d995"`);
        await queryRunner.query(`ALTER TABLE "usuarioPermissoesAcesso" DROP CONSTRAINT "FK_20070c1f6c47a54b0d5132dd9eb"`);
        await queryRunner.query(`ALTER TABLE "cliente" DROP CONSTRAINT "FK_ab7f7d4db71df2cf210dde9002c"`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_64db587949d301cbde4bc65d73a"`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_ec23de9a7f08d4f71c535268ca8"`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_2730a0c3947641edf256551f10c"`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_cadc6e9f0e7fcf37857190db649"`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_aaf1805669af8c7309583ffe365"`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_706ba2048b661d7b112dadcc159"`);
        await queryRunner.query(`ALTER TABLE "pedidoDadosEntrega" DROP CONSTRAINT "FK_d590af97fa66efdac39d10d3213"`);
        await queryRunner.query(`ALTER TABLE "pedidoDadosEntrega" DROP CONSTRAINT "FK_4c4c9b61e3caa60a3bf670377fa"`);
        await queryRunner.query(`ALTER TABLE "pedidoItem" DROP CONSTRAINT "FK_cdf10081da221202f8385843276"`);
        await queryRunner.query(`ALTER TABLE "pedidoItem" DROP CONSTRAINT "FK_3ab82d3bbf59be77eb05f760aa6"`);
        await queryRunner.query(`ALTER TABLE "pedidoItem" DROP CONSTRAINT "FK_2c2adffb2fde19b7091753534ef"`);
        await queryRunner.query(`ALTER TABLE "pedidoItem" DROP CONSTRAINT "FK_b0ac2c6863ccd97d636612dddd0"`);
        await queryRunner.query(`ALTER TABLE "produto" DROP CONSTRAINT "FK_155be8b724dc1fa07d62ed12342"`);
        await queryRunner.query(`ALTER TABLE "produtoImagens" DROP CONSTRAINT "FK_c3ebf6c9807d07513f222d903b9"`);
        await queryRunner.query(`DROP INDEX "IDX_11be84315fe02dddd87bb96d99"`);
        await queryRunner.query(`DROP INDEX "IDX_20070c1f6c47a54b0d5132dd9e"`);
        await queryRunner.query(`DROP TABLE "usuarioPermissoesAcesso"`);
        await queryRunner.query(`DROP TABLE "cliente"`);
        await queryRunner.query(`DROP TABLE "pedido"`);
        await queryRunner.query(`DROP TABLE "pedidoDadosEntrega"`);
        await queryRunner.query(`DROP TABLE "transportadoraFrete"`);
        await queryRunner.query(`DROP TABLE "tipoPedido"`);
        await queryRunner.query(`DROP TABLE "pedidoItem"`);
        await queryRunner.query(`DROP TABLE "situacaoExternaItemPedido"`);
        await queryRunner.query(`DROP TABLE "situacaoInternaItemPedido"`);
        await queryRunner.query(`DROP TABLE "produto"`);
        await queryRunner.query(`DROP TABLE "produtoImagens"`);
        await queryRunner.query(`DROP TABLE "tipoProduto"`);
        await queryRunner.query(`DROP TABLE "tipoPagamentoPedido"`);
        await queryRunner.query(`DROP TABLE "situacaoExternaPedido"`);
        await queryRunner.query(`DROP TABLE "usuarioAdmin"`);
        await queryRunner.query(`DROP TABLE "permissaoAcesso"`);
        await queryRunner.query(`DROP TABLE "tipoCliente"`);
    }

}
