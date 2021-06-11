import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { SituacoesExternasPedidoAppService } from "../../../../../domain/application-services/situacao-externa-pedido/situacoes-externas-pedido/situacoes-externas-pedido.app-service";

export class SituacoesExternasPedidoController extends ApiAdminController {
    private readonly appService = new SituacoesExternasPedidoAppService();
    
    async handle(routeContext: RouteContext) {
        const responseAppService = await this.appService.handle();
        this.result(routeContext, responseAppService, ResponseApiStatusCode.LISTAGEM);
    }
}
