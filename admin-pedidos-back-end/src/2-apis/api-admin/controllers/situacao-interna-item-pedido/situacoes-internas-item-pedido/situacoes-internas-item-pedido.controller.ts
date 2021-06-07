import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app"
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { SituacoesInternasItemPedidoServicoApp } from "../../../../../0-dominio/aplicacao/servicos/situacao-interna-item-pedido/situacoes-internas-item-pedido/situacoes-internas-item-pedido.servico-app";

export class SituacoesInternasItemPedidoController extends ControllerApiAdminApp {
    private readonly _situacoesInternasItemPedidoServicoApp = new SituacoesInternasItemPedidoServicoApp();

    async executar(contexto: ContextoRota) {
        const resultadoServico = await this._situacoesInternasItemPedidoServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.LISTAGEM);
    }
}