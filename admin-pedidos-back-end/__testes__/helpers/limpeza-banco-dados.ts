import { getManager, Connection } from "typeorm";
import dotenv from 'dotenv';
dotenv.config({ path: './ormconfig.test.env' });
import { DatabaseTables } from "../../src/core/infra/data/database-tables";
import { databaseConnection } from "../../src/infra/data/database/database-connection";

export const limpezaDadosInicioTeste = async () => {
    const entidadesDeletarDados = [
        DatabaseTables.PEDIDO_ITEM,
        DatabaseTables.PEDIDO,
        DatabaseTables.USUARIO_PERMISSOES,
        DatabaseTables.USUARIO_ADMIN,
        DatabaseTables.CLIENTE,
        DatabaseTables.PRODUTO,
        DatabaseTables.USUARIO_CLIENTE
    ];

    const conexaoBancoDados = await databaseConnection(process.env);
    if (conexaoBancoDados)
        await limparDadosBanco({ conexaoBancoDados, entidadesDeletarDados });
}

const limparDadosBanco = async (configuracoes: { 
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
