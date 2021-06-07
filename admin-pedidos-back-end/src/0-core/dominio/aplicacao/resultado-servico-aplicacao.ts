import { ResultadoValidacaoDadosModel } from "../resultado-validacao-dados.model";

export interface ResultadoServicoAplicacao<T> {
    sucesso: boolean;
    mensagens: ResultadoValidacaoDadosModel[];
    dados: T
}