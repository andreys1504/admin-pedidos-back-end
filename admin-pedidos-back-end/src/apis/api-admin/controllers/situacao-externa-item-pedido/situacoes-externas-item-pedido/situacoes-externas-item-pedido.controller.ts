import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { SituacoesExternasItemPedidoAppService } from "../../../../../domain/application-services/situacao-externa-item-pedido/situacoes-externas-item-pedido/situacoes-externas-item-pedido.app-service";

export class SituacoesExternasItemPedidoController extends ControllerApiAdmin {
    private readonly situacoesExternasItemPedidoServicoApp = new SituacoesExternasItemPedidoAppService();

    async executar(contexto: RouteContext) {
        const resultadoServico = await this.situacoesExternasItemPedidoServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.LISTAGEM);
    }
}
