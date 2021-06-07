import { ResultadoValidacaoDadosModel } from "../resultado-validacao-dados.model";
import { ResultadoServicoAplicacao } from "./resultado-servico-aplicacao";

export abstract class ServicoAplicacao {
    protected retornoErro(mensagens: ResultadoValidacaoDadosModel[]) {
        return {
            sucesso: false,
            mensagens
        } as ResultadoServicoAplicacao<any>;
    }

    protected retornoSucesso<TRetorno>(dadosRetorno: TRetorno) {
        return {
            sucesso: true,
            dados: dadosRetorno
        } as ResultadoServicoAplicacao<TRetorno>;
    }
}