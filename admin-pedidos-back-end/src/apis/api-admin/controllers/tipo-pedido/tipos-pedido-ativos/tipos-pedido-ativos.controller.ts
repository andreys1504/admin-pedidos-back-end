import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { TiposPedidoAtivosAppService } from "../../../../../domain/application-services/tipo-pedido/tipos-pedido-ativos/tipos-pedido-ativos.app-service";

export class TiposPedidoAtivosController extends ApiAdminController {
    private readonly appService = new TiposPedidoAtivosAppService();

    async handle(routeContext: RouteContext) {
        const responseAppService = await this.appService.handle();
        this.result(routeContext, responseAppService, ResponseApiStatusCode.LISTAGEM);
    }
}
