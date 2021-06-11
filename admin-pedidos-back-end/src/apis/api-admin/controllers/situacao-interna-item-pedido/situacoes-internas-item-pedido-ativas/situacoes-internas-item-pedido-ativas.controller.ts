import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { SituacoesInternasItemPedidoAtivasAppService } from "../../../../../domain/application-services/situacao-interna-item-pedido/situacoes-internas-item-pedido-ativas/situacoes-internas-item-pedido-ativas.app-service";

export class SituacoesInternasItemPedidoAtivasController extends ControllerApiAdmin {
    private readonly situacoesInternasItemPedidoAtivasServicoApp = new SituacoesInternasItemPedidoAtivasAppService();
    
    async executar(contexto: RouteContext) {
        const resultadoServico = await this.situacoesInternasItemPedidoAtivasServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.LISTAGEM);
    }
}
