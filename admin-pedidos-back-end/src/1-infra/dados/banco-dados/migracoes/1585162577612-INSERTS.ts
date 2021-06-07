import { MigrationInterface, QueryRunner } from "typeorm";
import { TabelasBancoDados } from "../../../../0-core/infra/dados/tabelas-banco-dados.app";

export class INSERTS1585162577612 implements MigrationInterface {
    name = 'INSERTS1585162577612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "${TabelasBancoDados.TIPO_PEDIDO}"
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
                'Novo Pedido',
                true,

                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            ),
            (
                2,
                'Conserto',
                true,

                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            );
        `);


        await queryRunner.query(`
            INSERT INTO "usuario"
            (
                "nomeUsuario"
                , senha
                , nome
                , "necessarioAlteracaoSenha"
                , ativo
                , "dataCriacao"
                , "dataAtualizacao"
            )
            VALUES
            (
                'andreys1504'
                , '284baeea16e367996a067aa1db9ed100'
                , 'andrey mariano'
                , false
                , true
                , '2020-03-23T22:31:26+00:00'
                , '2020-03-23T22:31:26+00:00'
            );
        `);

        await queryRunner.query(`
            INSERT INTO "${TabelasBancoDados.TIPO_CLIENTE}"
            (
                Id,
                descricao,
                ativo,
                "dataCriacao",
                "dataAtualizacao"
            )
            values
                (
                    1,
                    'Policial Militar',
                    true,
                    '2020-03-23T22:31:26+00:00',
                    '2020-03-23T22:31:26+00:00'
                ),
                (
                    2,
                    'Bombeiro',
                    true,
                    '2020-03-23T22:31:26+00:00',
                    '2020-03-23T22:31:26+00:00'
                ),
                (
                    3,
                    'Aeronáutica',
                    true,
                    '2020-03-23T22:31:26+00:00',
                    '2020-03-23T22:31:26+00:00'
                ),
                (
                    4,
                    'Força Nacional',
                    true,
                    '2020-03-23T22:31:26+00:00',
                    '2020-03-23T22:31:26+00:00'
                );
        `);

        await queryRunner.query(`
            INSERT INTO "${TabelasBancoDados.TIPO_PAGAMENTO_PEDIDO}"
            (
                id
                ,descricao
                ,ativo
                ,"dataCriacao"
                ,"dataAtualizacao"
            )
            values
                (
                    1,
                    'Cartão',
                    true,
                    '2020-03-23T22:31:26+00:00',
                    '2020-03-23T22:31:26+00:00'
                ),
                (
                    2,
                    'Dinheiro',
                    true,
                    '2020-03-23T22:31:26+00:00',
                    '2020-03-23T22:31:26+00:00'
                ),
                (
                    3,
                    'Boleto',
                    true,
                    '2020-03-23T22:31:26+00:00',
                    '2020-03-23T22:31:26+00:00'
                );

        `);

        await queryRunner.query(`
            INSERT INTO "${TabelasBancoDados.SITUACAO_INTERNA_ITEM_PEDIDO}"
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
                'Recebido',
                true,
        
                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            ),
            (
                3,
                'Corte',
                true,
        
                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            ),
            (
                5,
                'Ajuste',
                true,
        
                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            ),
            (
                6,
                'Pronto Para Entrega',
                true,
        
                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            ),
            (
                7,
                'Enviado Pelos Correios',
                true,
        
                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            ),
            (
                8,
                'Envio Pelo Motoboy',
                true,
        
                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            ),
            (
                9,
                'Envio pela Loja',
                true,
        
                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            );
        `);

        await queryRunner.query(`
            INSERT INTO "${TabelasBancoDados.SITUACAO_EXTERNA_PEDIDO}"
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
                'Em Andamento',
                true,

                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            ),
            (
                2,
                'Concluído',
                true,

                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            ),
            (
                3,
                'Entregue',
                true,

                '2020-03-23T22:31:26+00:00',
                '2020-03-23T22:31:26+00:00'
            );

        `);

        await queryRunner.query(`
            INSERT INTO "${TabelasBancoDados.PERMISSAO_ACESSO}"
            (
                chave
                ,descricao
                ,"dataCriacao"
                ,"dataAtualizacao"
            )
            VALUES
                (
                    'cadastroUsuarioApp'
                    ,'Cadastro de novos usuários'
            
                    ,'2020-03-23T22:31:26+00:00'
                    ,'2020-03-23T22:31:26+00:00'
                );
        `);

        await queryRunner.query(`
            INSERT INTO "${TabelasBancoDados.USUARIO_PERMISSOES}"
            (
                "usuarioId"
                ,"permissaoAcessoId"
            )
            VALUES
                (
                    1
                    ,1
                );
        `);

        await queryRunner.query(`
            INSERT INTO "${TabelasBancoDados.CLIENTE}"
                (
                    nome
                    ,"nomeGuerra"
                    ,"tipoClienteId"
                    ,"cpfCnpj"
                    ,logradouro
                    ,cep
                    ,"nomeCidade"
                    ,"siglaUf"
                    ,telefone
                    ,email
                    ,"dataCriacao"
                    ,"dataAtualizacao"
                )
            VALUES
                (
                    'andrey mariano',
                    'andreizao',
                    1,
                    '03475201119',
                    'sgcv lote 11',
                    '71215610',
                    'brasília',
                    'DF',
                    '61999019577',
                    'andreys1504@gmail.com',
            
                    '2020-03-23T22:31:26+00:00',
                    '2020-03-23T22:31:26+00:00'
            );
        `);

        await queryRunner.query(`
            INSERT INTO "${TabelasBancoDados.SITUACAO_EXTERNA_ITEM_PEDIDO}"
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
                    'Finalizando',
                    true,

                    '2020-03-23T22:31:26+00:00',
                    '2020-03-23T22:31:26+00:00'
                ),
                (
                    2,
                    'Aguardando Retirada',
                    true,

                    '2020-03-23T22:31:26+00:00',
                    '2020-03-23T22:31:26+00:00'
                ),
                (
                    3,
                    'Entregue',
                    true,

                    '2020-03-23T22:31:26+00:00',
                    '2020-03-23T22:31:26+00:00'
                );
                    
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "${TabelasBancoDados.PEDIDO_ITEM}"
        `);

        await queryRunner.query(`
            DELETE FROM "${TabelasBancoDados.PEDIDO}"
        `);

        await queryRunner.query(`
            DELETE FROM "${TabelasBancoDados.USUARIO_PERMISSOES}"
        `);

        await queryRunner.query(`
            DELETE FROM "${TabelasBancoDados.PERMISSAO_ACESSO}"
        `);

        await queryRunner.query(`
            DELETE FROM "${TabelasBancoDados.CLIENTE}"
        `);

        await queryRunner.query(`
            DELETE FROM "${TabelasBancoDados.PRODUTO}"
        `);

        await queryRunner.query(`
            DELETE FROM "usuario"
        `);

        await queryRunner.query(`
            DELETE FROM "${TabelasBancoDados.SITUACAO_EXTERNA_ITEM_PEDIDO}"
        `);

        await queryRunner.query(`
            DELETE FROM "${TabelasBancoDados.SITUACAO_EXTERNA_PEDIDO}"
        `);

        await queryRunner.query(`
            DELETE FROM "${TabelasBancoDados.SITUACAO_INTERNA_ITEM_PEDIDO}"
        `);

        await queryRunner.query(`
            DELETE FROM "${TabelasBancoDados.TIPO_CLIENTE}"
        `);

        await queryRunner.query(`
            DELETE FROM "${TabelasBancoDados.TIPO_PAGAMENTO_PEDIDO}"
        `);

        await queryRunner.query(`
            DELETE FROM "${TabelasBancoDados.TIPO_PEDIDO}"
        `);
    }
}
