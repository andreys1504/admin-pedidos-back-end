import { createConnection, ConnectionOptions } from 'typeorm';
import { databaseConnectionOptions } from '../../../core/infra/data/database-connection-options';

export const startConnection = async (environmentVariables: any) => {
  await createConnection(
    databaseConnectionOptions(environmentVariables) as ConnectionOptions
  )
    .then(async (connection) => {
      console.log('conectado ao banco de dados!!!');
      return connection;
    })
    .catch((error) => {
      console.log('erro conexão banco de dados: ', error);
      return null;
    });
};
