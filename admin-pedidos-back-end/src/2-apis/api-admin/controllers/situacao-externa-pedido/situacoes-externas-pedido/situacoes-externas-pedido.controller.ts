import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { SituacoesExternasPedidoServicoApp } from "../../../../../0-dominio/aplicacao/servicos/situacao-externa-pedido/situacoes-externas-pedido/situacoes-externas-pedido.servico-app";

export class SituacoesExternasPedidoController extends ControllerApiAdminApp {
    private readonly _situacoesExternasPedidoServicoApp = new SituacoesExternasPedidoServicoApp();
    
    async executar(contexto: ContextoRota) {
        const resultadoServico = await this._situacoesExternasPedidoServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.LISTAGEM);
    }
}