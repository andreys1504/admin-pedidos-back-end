import { UsuarioAdmin } from '../entidades/usuario-admin';
import { TabelasBancoDados } from "../../0-core/infra/dados/tabelas-banco-dados.app";
import { Repositorio } from '../../0-core/dominio/repositorios/repositorio';

export class UsuarioAdminRepositorio extends Repositorio<UsuarioAdmin> {
    constructor() {
        super(UsuarioAdmin.name);
    }

    async autenticar(dadosAutenticacao: {
        nomeUsuario: string,
        senha: string
    }) {
        const sql =
            `
                SELECT
                    "usu"."id" as "id" 
                    ,"usu"."nomeUsuario" as "nomeUsuario"
                    ,"usu"."necessarioAlteracaoSenha" as "necessarioAlteracaoSenha"
                    ,"usu"."ativo" as "ativo"
                    ,"usu"."nome" as "nome"
                FROM
                    "${TabelasBancoDados.USUARIO_ADMIN}" "usu"
                WHERE
                    "usu"."nomeUsuario" = $1
                    AND "usu"."senha" = $2
            `;

        let usuario =
            (await this.retornarDadosPorSql<any>({
                sql,
                parametros: [dadosAutenticacao.nomeUsuario, dadosAutenticacao.senha]
            }))[0];

        if (usuario) {
            const sqlPermissoes = 
                `
                    SELECT
                        "perm"."chave" as "chave"
                    FROM
                        "${TabelasBancoDados.USUARIO_ADMIN}" "usu"
                        LEFT JOIN "${TabelasBancoDados.USUARIO_PERMISSOES}" "usuPerm" ON "usu"."id" = "usuPerm"."usuarioAdminId" 
                        LEFT JOIN "${TabelasBancoDados.PERMISSAO_ACESSO}" "perm" ON "usuPerm"."permissaoAcessoId" = "perm"."id"
                    WHERE
                        "usu"."id" = $1
                `;
            const permissoes = 
                await this.retornarDadosPorSql<string>({ 
                    sql: sqlPermissoes, 
                    parametros: [usuario.id]
                });

            usuario.permissoesAcesso = permissoes;
        }

        return usuario;
    }
    
    async usuarios() {
        const sql = 
            `
                SELECT
                    "usu"."id" as "id"
                    ,"usu"."nomeUsuario" as "nomeUsuario"
                    ,"usu"."necessarioAlteracaoSenha" as "necessarioAlteracaoSenha"
                    ,"usu"."ativo" as "ativo"
                    ,"usu"."nome" as "nome"
                    ,"usu"."dataCriacao" as "dataCriacao"
                    ,"usu"."dataAtualizacao" as "dataAtualizacao"
                    ,"perm"."chave" as "permissaoCadastroUsuario"
                FROM
                    "${TabelasBancoDados.USUARIO_ADMIN}" "usu"
                    LEFT JOIN "${TabelasBancoDados.USUARIO_PERMISSOES}" "usuPerm" ON "usu"."id" = "usuPerm"."usuarioAdminId" 
                    LEFT JOIN "${TabelasBancoDados.PERMISSAO_ACESSO}" "perm" ON "usuPerm"."permissaoAcessoId" = "perm"."id"
                WHERE
                    ("perm".id = '1' --permissao cadastro usuário
                    OR "perm".id IS NULL)
                    AND "usu"."id" > 0
                ORDER BY
                    "usu"."dataAtualizacao" DESC
            `;

        return await this.retornarDadosPorSql<any>({ sql });
    }

    async existenciaUsuarioPorNomeUsuario(nomeUsuario: string) {
        nomeUsuario = nomeUsuario.toUpperCase();
        const sql = 
            `
                SELECT 
                    usuario.id
                FROM 
                    "${TabelasBancoDados.USUARIO_ADMIN}" usuario
                WHERE
                    UPPER(usuario."nomeUsuario") = $1
                ORDER BY 
                    usuario.id
            `;
        const usuario = 
            await this.retornarDadosPorSql<number>({ sql, parametros: [nomeUsuario] });

        return (!usuario || usuario.length < 1) ? false : true;
    }
}
