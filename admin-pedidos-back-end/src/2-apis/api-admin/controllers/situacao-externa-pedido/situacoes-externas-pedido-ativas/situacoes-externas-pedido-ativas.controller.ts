import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app"
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { SituacoesExternasPedidoAtivasServicoApp } from "../../../../../0-dominio/aplicacao/servicos/situacao-externa-pedido/situacoes-externas-pedido-ativas/situacoes-externas-pedido-ativas.servico-app";

export class SituacoesExternasPedidoAtivasController extends ControllerApiAdminApp {
    private readonly _situacoesExternasPedidoAtivasServicoApp = new SituacoesExternasPedidoAtivasServicoApp();
    
    async executar(contexto: ContextoRota) {
        const resultadoServico = await this._situacoesExternasPedidoAtivasServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.LISTAGEM);
    }
}