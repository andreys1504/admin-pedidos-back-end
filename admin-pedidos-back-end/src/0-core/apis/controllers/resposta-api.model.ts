import { ResultadoValidacaoDadosModel } from "../../dominio/resultado-validacao-dados.model";

export interface RespostaApi {
    sucesso: boolean;
    dados: any;
    mensagens: ResultadoValidacaoDadosModel[];
}