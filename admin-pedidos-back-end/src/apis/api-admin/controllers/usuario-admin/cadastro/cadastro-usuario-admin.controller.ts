import { CadastroUsuarioAdminRequestApi } from "./cadastro-usuario-admin.request-api";
import { CadastroUsuarioAdminAppService } from "../../../../../domain/application-services/usuario-admin/cadastro/cadastro-usuario-admin.app-service";
import { ApiAdminController } from "../../api-admin-controller";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";

export class CadastroUsuarioAdminController extends ApiAdminController {
    private readonly appService = new CadastroUsuarioAdminAppService();

    async handle(routeContext: RouteContext) {
        const requestApi = routeContext.request.body as CadastroUsuarioAdminRequestApi;
        const responseAppService = await this.appService.handle(requestApi);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.CADASTRO);
    }
}
