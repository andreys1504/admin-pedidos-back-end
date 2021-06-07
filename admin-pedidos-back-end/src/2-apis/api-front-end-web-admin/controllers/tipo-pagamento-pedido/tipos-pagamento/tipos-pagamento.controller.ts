import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";
import { TiposPagamentoServicoApp } from "../../../../../0-dominio/aplicacao/servicos/tipo-pagamento-pedido/tipos-pagamento/tipos-pagamento.servico-app";

export class TiposPagamentoController extends ControllerApiAdminApp {
    private readonly _tiposPagamentoServicoApp = new TiposPagamentoServicoApp();

    async executar(contexto: ContextoRota) {
        const resultadoServico = await this._tiposPagamentoServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.LISTAGEM);
    }
}