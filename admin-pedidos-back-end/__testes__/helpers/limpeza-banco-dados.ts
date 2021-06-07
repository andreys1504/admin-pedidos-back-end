import { getManager, Connection } from "typeorm";

import dotenv from 'dotenv';
dotenv.config({ path: './ormconfig.test.env' });
import { TabelasBancoDados } from "../../src/0-core/infra/dados/tabelas-banco-dados.app";
import { conectarBancoDados } from "../../src/1-infra/dados/banco-dados/conexao-banco-dados.app";

export const limparDadosBanco = async (configuracoes: { 
    conexaoBancoDados: Connection, 
    entidadesDeletarDados: string[]
}) => {
    console.log(configuracoes.conexaoBancoDados.options.database);

    const entidades = configuracoes.conexaoBancoDados.entityMetadatas;

    return Promise.all(entidades.map(entidade => {
        if (configuracoes.entidadesDeletarDados && configuracoes.entidadesDeletarDados.length > 0)
            if (!configuracoes.entidadesDeletarDados.find(x => entidade.name == x))
                return;

        const repository = getManager().getRepository(entidade.name);
        return repository.query(`DELETE FROM "${entidade.tableName}";`);
    }));
}

export const limpezaDadosInicioTeste = async () => {
    const entidadesDeletarDados = [
        TabelasBancoDados.PEDIDO_ITEM,
        TabelasBancoDados.PEDIDO,
        TabelasBancoDados.USUARIO_PERMISSOES,
        TabelasBancoDados.USUARIO_ADMIN,
        TabelasBancoDados.CLIENTE,
        TabelasBancoDados.PRODUTO,
        TabelasBancoDados.USUARIO_CLIENTE
    ];

    const conexaoBancoDados = await conectarBancoDados(process.env);
    if (conexaoBancoDados)
        await limparDadosBanco({ conexaoBancoDados, entidadesDeletarDados });
}