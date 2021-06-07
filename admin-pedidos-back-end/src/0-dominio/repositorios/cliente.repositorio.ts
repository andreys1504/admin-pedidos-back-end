import { Cliente } from "../entidades/cliente";
import { Repositorio } from "../../0-core/dominio/repositorios/repositorio";
import { TabelasBancoDados } from "../../0-core/infra/dados/tabelas-banco-dados.app";
import { parametroValidoSql } from "../../0-core/helpers";

export class ClienteRepositorio extends Repositorio<Cliente> {
    constructor() {
        super(Cliente.name);
    }

    async clientesPorConteudoNome(opcoesBusca: {
        camposRetorno?: string[],
        nome: string
    }) {
        if (!parametroValidoSql(opcoesBusca.nome) || !opcoesBusca.nome)
            return [] as Cliente[];

        let like = `%${opcoesBusca.nome}%`;
        if (opcoesBusca.nome.length <= 2)
            like = `${opcoesBusca.nome}%`;

        const aliasTabela = 'cliente';
        const sql =
            `
                SELECT
                    ${
                        (opcoesBusca.camposRetorno && opcoesBusca.camposRetorno.length > 0) ?
                        (this.configurarCamposSelect({
                            camposRetorno: opcoesBusca.camposRetorno,
                            aliasTabela
                        }))
                        : ' * '
                    }
                FROM
                    "${TabelasBancoDados.CLIENTE}" ${aliasTabela}
                WHERE
                    ${aliasTabela}.nome ILIKE '${like}'
                ORDER BY
                    ${aliasTabela}."dataAtualizacao" DESC
            `;

        return await this.retornarDadosPorSql<Cliente>({ sql });
    }
}