import { createConnection, ConnectionOptions } from "typeorm";
import { opcoesConexaoBancoDados } from "../../../0-core/infra/dados/opcoes-conexao-banco-dados";

export const conectarBancoDados = async function(variaveisAmbiente: any) {
    return await createConnection(opcoesConexaoBancoDados(variaveisAmbiente) as ConnectionOptions)
        .then(async connection => {
            console.log("conectado ao banco de dados!!!");
            return connection;
        }).catch(erro => {
            console.log("ORM erro: ", erro);
            return null;
        });
}