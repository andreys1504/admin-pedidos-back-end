import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { SituacoesInternasItemPedidoAtivasAppService } from "../../../../../domain/application-services/situacao-interna-item-pedido/situacoes-internas-item-pedido-ativas/situacoes-internas-item-pedido-ativas.app-service";

export class SituacoesInternasItemPedidoAtivasController extends ApiAdminController {
    private readonly appService = new SituacoesInternasItemPedidoAtivasAppService();
    
    async handleAsync(routeContext: RouteContext) {
        const responseAppService = await this.appService.handleAsync();
        this.result(routeContext, responseAppService, ResponseApiStatusCode.LISTAGEM);
    }
}
