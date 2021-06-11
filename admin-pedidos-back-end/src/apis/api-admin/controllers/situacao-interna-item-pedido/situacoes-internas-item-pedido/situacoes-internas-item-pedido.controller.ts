import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { SituacoesInternasItemPedidoAppService } from "../../../../../domain/application-services/situacao-interna-item-pedido/situacoes-internas-item-pedido/situacoes-internas-item-pedido.app-service";

export class SituacoesInternasItemPedidoController extends ControllerApiAdmin {
    private readonly situacoesInternasItemPedidoServicoApp = new SituacoesInternasItemPedidoAppService();

    async executar(contexto: RouteContext) {
        const resultadoServico = await this.situacoesInternasItemPedidoServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.LISTAGEM);
    }
}
