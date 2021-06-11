import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { SituacoesExternasItemPedidoAppService } from "../../../../../domain/application-services/situacao-externa-item-pedido/situacoes-externas-item-pedido/situacoes-externas-item-pedido.app-service";

export class SituacoesExternasItemPedidoController extends ApiAdminController {
    private readonly appService = new SituacoesExternasItemPedidoAppService();

    async handle(routeContext: RouteContext) {
        const responseAppService = await this.appService.handle();
        this.result(routeContext, responseAppService, ResponseApiStatusCode.LISTAGEM);
    }
}
