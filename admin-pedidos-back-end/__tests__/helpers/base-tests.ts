import { getManager, Connection } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config({ path: './ormconfig.test.env' });
import { DatabaseTables } from '../../src/core/infra/data/database-tables';
import { createConnection, ConnectionOptions } from 'typeorm';
import { databaseConnectionOptions } from '../../src/core/infra/data/database-connection-options';

export const start = async () => {
  const tables = [
    DatabaseTables.PEDIDO_ITEM,
    DatabaseTables.PEDIDO,
    DatabaseTables.USUARIO_PERMISSOES,
    DatabaseTables.USUARIO_ADMIN,
    DatabaseTables.CLIENTE,
    DatabaseTables.PRODUTO,
  ];

  const databaseConnection = await getConnectionDatabase(process.env);
  if (databaseConnection)
    await clearDatabaseTables({ databaseConnection, tables });
};

export const close = async () => {
  await getManager().connection.close();
}

const clearDatabaseTables = async (settings: {
  databaseConnection: Connection;
  tables: string[];
}) => {
  console.log(settings.databaseConnection.options.database);

  const entidades = settings.databaseConnection.entityMetadatas;

  return Promise.all(
    entidades.map((entity) => {
      if (settings.tables && settings.tables.length > 0)
        if (!settings.tables.find((x) => entity.name == x)) return;

      const repository = getManager().getRepository(entity.name);
      return repository.query(`DELETE FROM '${entity.tableName}';`);
    })
  );
};

const getConnectionDatabase = async (environmentVariables: any) => {
  return await createConnection(
    databaseConnectionOptions(environmentVariables) as ConnectionOptions
  );
};
