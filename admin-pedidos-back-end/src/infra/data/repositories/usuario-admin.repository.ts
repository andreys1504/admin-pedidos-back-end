import { DatabaseTables } from "../../../core/infra/data/database-tables";
import { RepositoryBase } from "../repository";
import { UsuarioAdmin } from "../../../domain/entities";

export class UsuarioAdminRepository extends RepositoryBase<UsuarioAdmin> {
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
                    "${DatabaseTables.USUARIO_ADMIN}" "usu"
                WHERE
                    "usu"."nomeUsuario" = $1
                    AND "usu"."senha" = $2
            `;

        let usuario =
            (await this.retornarDadosPorSqlAsync<any>({
                sql,
                parametros: [dadosAutenticacao.nomeUsuario, dadosAutenticacao.senha]
            }))[0];

        if (usuario) {
            const sqlPermissoes = 
                `
                    SELECT
                        "perm"."chave" as "chave"
                    FROM
                        "${DatabaseTables.USUARIO_ADMIN}" "usu"
                        LEFT JOIN "${DatabaseTables.USUARIO_PERMISSOES}" "usuPerm" ON "usu"."id" = "usuPerm"."usuarioAdminId" 
                        LEFT JOIN "${DatabaseTables.PERMISSAO_ACESSO}" "perm" ON "usuPerm"."permissaoAcessoId" = "perm"."id"
                    WHERE
                        "usu"."id" = $1
                `;
            const permissoes = 
                await this.retornarDadosPorSqlAsync<string>({ 
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
                    "${DatabaseTables.USUARIO_ADMIN}" "usu"
                    LEFT JOIN "${DatabaseTables.USUARIO_PERMISSOES}" "usuPerm" ON "usu"."id" = "usuPerm"."usuarioAdminId" 
                    LEFT JOIN "${DatabaseTables.PERMISSAO_ACESSO}" "perm" ON "usuPerm"."permissaoAcessoId" = "perm"."id"
                WHERE
                    ("perm".id = '1' --permissao cadastro usuário
                    OR "perm".id IS NULL)
                    AND "usu"."id" > 0
                ORDER BY
                    "usu"."dataAtualizacao" DESC
            `;

        return await this.retornarDadosPorSqlAsync<any>({ sql });
    }

    async existenciaUsuarioPorNomeUsuario(nomeUsuario: string) {
        nomeUsuario = nomeUsuario.toUpperCase();
        const sql = 
            `
                SELECT 
                    usuario.id
                FROM 
                    "${DatabaseTables.USUARIO_ADMIN}" usuario
                WHERE
                    UPPER(usuario."nomeUsuario") = $1
                ORDER BY 
                    usuario.id
            `;
        const usuario = 
            await this.retornarDadosPorSqlAsync<number>({ sql, parametros: [nomeUsuario] });

        return (!usuario || usuario.length < 1) ? false : true;
    }
}
