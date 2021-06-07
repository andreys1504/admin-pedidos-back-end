import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { SituacoesExternasItemPedidoServicoApp } from "../../../../../0-dominio/aplicacao/servicos/situacao-externa-item-pedido/situacoes-externas-item-pedido/situacoes-externas-item-pedido.servico-app";

export class SituacoesExternasItemPedidoController extends ControllerApiAdminApp {
    private readonly _situacoesExternasItemPedidoServicoApp = new SituacoesExternasItemPedidoServicoApp();

    async executar(contexto: ContextoRota) {
        const resultadoServico = await this._situacoesExternasItemPedidoServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.LISTAGEM);
    }
}