import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { TiposClienteAtivosAppService } from "../../../../../domain/application-services/tipo-cliente/tipos-cliente-ativos/tipos-cliente-ativos.app-service";

export class TiposClienteAtivosController extends ApiAdminController {
    private readonly appService = new TiposClienteAtivosAppService();

    async handle(routeContext: RouteContext) {
        const responseAppService = await this.appService.handle();
        this.result(routeContext, responseAppService, ResponseApiStatusCode.LISTAGEM);
    }
}
