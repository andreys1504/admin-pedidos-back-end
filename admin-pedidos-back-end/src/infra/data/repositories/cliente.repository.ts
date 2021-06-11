import { parametroValidoSql } from "../../../core/helpers";
import { DatabaseTables } from "../../../core/infra/data/database-tables";
import { RepositoryBase } from "../../../core/infra/data/repository";
import { Cliente } from "../../../domain/entities";

export class ClienteRepository extends RepositoryBase<Cliente> {
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
                    "${DatabaseTables.CLIENTE}" ${aliasTabela}
                WHERE
                    ${aliasTabela}.nome ILIKE '${like}'
                ORDER BY
                    ${aliasTabela}."dataAtualizacao" DESC
            `;

        return await this.retornarDadosPorSql<Cliente>({ sql });
    }
}