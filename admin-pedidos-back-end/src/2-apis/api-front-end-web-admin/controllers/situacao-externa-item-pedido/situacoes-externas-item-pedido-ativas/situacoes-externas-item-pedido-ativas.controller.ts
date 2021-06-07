import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { SituacoesExternasItemPedidoAtivasServicoApp } from "../../../../../0-dominio/aplicacao/servicos/situacao-externa-item-pedido/situacoes-externas-item-pedido-ativas/situacoes-externas-item-pedido-ativas.servico-app";

export class SituacoesExternasItemPedidoAtivasController extends ControllerApiAdminApp {
    private readonly _situacoesExternasItemPedidoAtivasServicoApp = new SituacoesExternasItemPedidoAtivasServicoApp();

    async executar(contexto: ContextoRota) {
        const resultadoServico = await this._situacoesExternasItemPedidoAtivasServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.LISTAGEM);
    }
}