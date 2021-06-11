import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { AtivacaoUsuarioAdminAppService } from "../../../../../domain/application-services/usuario-admin/ativacao/ativacao-usuario-admin.app-service";

export class AtivacaoUsuarioAdminController extends ApiAdminController {
    private readonly appService = new AtivacaoUsuarioAdminAppService();

    async handle(routeContext: RouteContext) {
        const idUsuario = Number(routeContext.request.params.id);
        const responseAppService = await this.appService.handle({ 
            idUsuarioASerAtivado: idUsuario,
            idUsuarioRealizacaoOperacao: this.authenticatedUser(routeContext.request).idUsuario
        });
        this.result(routeContext, responseAppService, ResponseApiStatusCode.ATUALIZACAO);
    }
}
