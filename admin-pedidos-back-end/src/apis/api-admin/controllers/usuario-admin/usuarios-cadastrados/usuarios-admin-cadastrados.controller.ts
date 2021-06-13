import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { UsuariosCadastradosAppService } from "../../../../../domain/application-services/usuario-admin/usuarios-cadastrados/usuarios-cadastrados.app-service";

export class UsuariosAdminController extends ApiAdminController {
    private readonly appService = new UsuariosCadastradosAppService();

    async handleAsync(routeContext: RouteContext) {
        const responseAppService = await this.appService.handleAsync();
        this.result(routeContext, responseAppService, ResponseApiStatusCode.LISTAGEM);
    }
}
