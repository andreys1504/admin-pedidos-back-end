import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { SituacoesInternasItemPedidoAtivasServicoApp } from "../../../../../0-dominio/aplicacao/servicos/situacao-interna-item-pedido/situacoes-internas-item-pedido-ativas/situacoes-internas-item-pedido-ativas.servico-app";

export class SituacoesInternasItemPedidoAtivasController extends ControllerApiAdminApp {
    private readonly _situacoesInternasItemPedidoAtivasServicoApp = new SituacoesInternasItemPedidoAtivasServicoApp();
    
    async executar(contexto: ContextoRota) {
        const resultadoServico = await this._situacoesInternasItemPedidoAtivasServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.LISTAGEM);
    }
}