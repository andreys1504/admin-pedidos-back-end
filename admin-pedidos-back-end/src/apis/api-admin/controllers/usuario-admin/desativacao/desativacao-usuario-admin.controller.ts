import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { DesativacaoUsuarioAdminAppService } from "../../../../../domain/application-services/usuario-admin/desativacao/desativacao-usuario-admin.app-service";
import { DesativacaoUsuarioAdminRequest } from "../../../../../domain/application-services/usuario-admin/desativacao/desativacao-usuario-admin.request";

export class DesativacaoUsuarioAdminController extends ApiAdminController {
    private readonly appService = new DesativacaoUsuarioAdminAppService();

    async handleAsync(routeContext: RouteContext) {
        const idUsuario = Number(routeContext.request.params.id);
        const requestAppService = new DesativacaoUsuarioAdminRequest({
            idUsuarioASerDesativado: idUsuario,
            idUsuarioRealizacaoOperacao: this.authenticatedUser(routeContext.request).idUsuario
        });
        const responseAppService = await this.appService.handleAsync(requestAppService);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.ATUALIZACAO);
    }
}
