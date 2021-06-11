import { getManager, Connection } from "typeorm";
import dotenv from "dotenv";
dotenv.config({ path: "./ormconfig.test.env" });
import { DatabaseTables } from "../../src/core/infra/data/database-tables";
import { databaseConnection } from "../../src/infra/data/database/database-connection";

export const clearData = async () => {
  const tables = [
    DatabaseTables.PEDIDO_ITEM,
    DatabaseTables.PEDIDO,
    DatabaseTables.USUARIO_PERMISSOES,
    DatabaseTables.USUARIO_ADMIN,
    DatabaseTables.CLIENTE,
    DatabaseTables.PRODUTO,
  ];

  const settingsDatabaseConnection = await databaseConnection(process.env);
  if (settingsDatabaseConnection)
    await clearDataTables({ settingsDatabaseConnection, tables });
};

const clearDataTables = async (settings: {
  settingsDatabaseConnection: Connection;
  tables: string[];
}) => {
  console.log(settings.settingsDatabaseConnection.options.database);

  const entidades = settings.settingsDatabaseConnection.entityMetadatas;

  return Promise.all(
    entidades.map((entity) => {
      if (
        settings.tables &&
        settings.tables.length > 0
      )
        if (
          !settings.tables.find((x) => entity.name == x)
        )
          return;

      const repository = getManager().getRepository(entity.name);
      return repository.query(`DELETE FROM "${entity.tableName}";`);
    })
  );
};
