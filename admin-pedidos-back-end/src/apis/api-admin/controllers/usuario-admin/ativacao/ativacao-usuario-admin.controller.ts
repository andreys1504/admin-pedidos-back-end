import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { AtivacaoUsuarioAdminAppService } from "../../../../../domain/application-services/usuario-admin/ativacao/ativacao-usuario-admin.app-service";
import { AtivacaoUsuarioAdminRequest } from "../../../../../domain/application-services/usuario-admin/ativacao/ativacao-usuario-admin.request";

export class AtivacaoUsuarioAdminController extends ApiAdminController {
    private readonly appService = new AtivacaoUsuarioAdminAppService();

    async handleAsync(routeContext: RouteContext) {
        const idUsuario = Number(routeContext.request.params.id);
        const requestAppService = new AtivacaoUsuarioAdminRequest({ 
            idUsuarioASerAtivado: idUsuario,
            idUsuarioRealizacaoOperacao: this.authenticatedUser(routeContext.request).idUsuario
        });
        const responseAppService = await this.appService.handleAsync(requestAppService);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.ATUALIZACAO);
    }
}
