import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { SituacoesExternasPedidoAtivasAppService } from "../../../../../domain/application-services/situacao-externa-pedido/situacoes-externas-pedido-ativas/situacoes-externas-pedido-ativas.app-service";

export class SituacoesExternasPedidoAtivasController extends ApiAdminController {
    private readonly appService = new SituacoesExternasPedidoAtivasAppService();
    
    async handle(routeContext: RouteContext) {
        const responseAppService = await this.appService.handle();
        this.result(routeContext, responseAppService, ResponseApiStatusCode.LISTAGEM);
    }
}
