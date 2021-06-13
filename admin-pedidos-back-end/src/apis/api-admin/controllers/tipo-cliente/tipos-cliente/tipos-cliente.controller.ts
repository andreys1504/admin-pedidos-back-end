import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { TiposClienteAppService } from "../../../../../domain/application-services/tipo-cliente/tipos-cliente/tipos-cliente-cadastrados.app-service";

export class TiposClienteController extends ApiAdminController {
    private readonly appService = new TiposClienteAppService();

    async handleAsync(routeContext: RouteContext) {
        const responseAppService = await this.appService.handleAsync();
        this.result(routeContext, responseAppService, ResponseApiStatusCode.LISTAGEM);
    }
}
