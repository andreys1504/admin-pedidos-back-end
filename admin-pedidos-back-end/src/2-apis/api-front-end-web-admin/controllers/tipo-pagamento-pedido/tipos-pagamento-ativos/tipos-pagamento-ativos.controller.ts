import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";
import { TiposPagamentoAtivosServicoApp } from "../../../../../0-dominio/aplicacao/servicos/tipo-pagamento-pedido/tipos-pagamento-ativos/tipos-pagamento-ativos.servico-app";

export class TiposPagamentoAtivosController extends ControllerApiAdminApp {
    private readonly _tiposPagamentoAtivosServicoApp = new TiposPagamentoAtivosServicoApp();
    
    async executar(contexto: ContextoRota) {
        const resultadoServico = await this._tiposPagamentoAtivosServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.LISTAGEM);
    }
}