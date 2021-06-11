import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { SituacoesInternasItemPedidoAppService } from "../../../../../domain/application-services/situacao-interna-item-pedido/situacoes-internas-item-pedido/situacoes-internas-item-pedido.app-service";

export class SituacoesInternasItemPedidoController extends ApiAdminController {
    private readonly appService = new SituacoesInternasItemPedidoAppService();

    async handle(routeContext: RouteContext) {
        const responseAppService = await this.appService.handle();
        this.result(routeContext, responseAppService, ResponseApiStatusCode.LISTAGEM);
    }
}
