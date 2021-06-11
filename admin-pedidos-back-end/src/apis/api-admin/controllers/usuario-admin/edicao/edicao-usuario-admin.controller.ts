import { EdicaoUsuarioRequestApi } from "./edicao-usuario.request-api";
import { EdicaoUsuarioAdminAppService } from "../../../../../domain/application-services/usuario-admin/edicao/edicao-usuario-admin.app-service";
import { ApiAdminController } from "../../api-admin-controller";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";

export class EdicaoUsuarioAdminController extends ApiAdminController {
    private readonly appService = new EdicaoUsuarioAdminAppService();

    async handle(routeContext: RouteContext) {
        const requestApi = routeContext.request.body as EdicaoUsuarioRequestApi;
        const responseAppService = await this.appService.handle(requestApi);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.ATUALIZACAO);
    }
}
