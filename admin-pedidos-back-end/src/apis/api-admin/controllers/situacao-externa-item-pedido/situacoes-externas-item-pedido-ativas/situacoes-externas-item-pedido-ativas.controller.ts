import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { SituacoesExternasItemPedidoAtivasAppService } from "../../../../../domain/application-services/situacao-externa-item-pedido/situacoes-externas-item-pedido-ativas/situacoes-externas-item-pedido-ativas.app-service";

export class SituacoesExternasItemPedidoAtivasController extends ControllerApiAdmin {
    private readonly situacoesExternasItemPedidoAtivasServicoApp = new SituacoesExternasItemPedidoAtivasAppService();

    async executar(contexto: RouteContext) {
        const resultadoServico = await this.situacoesExternasItemPedidoAtivasServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.LISTAGEM);
    }
}
