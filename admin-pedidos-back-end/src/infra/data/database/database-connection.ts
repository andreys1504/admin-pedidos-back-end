import { createConnection, ConnectionOptions } from "typeorm";
import { databaseConnectionOptions } from "../../../core/infra/data/database-connection-options";

export const databaseConnection = async function(variaveisAmbiente: any) {
    return await createConnection(databaseConnectionOptions(variaveisAmbiente) as ConnectionOptions)
        .then(async connection => {
            console.log("conectado ao banco de dados!!!");
            return connection;
        }).catch(erro => {
            console.log("ORM erro: ", erro);
            return null;
        });
}
