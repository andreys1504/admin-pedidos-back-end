import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { DesativacaoUsuarioAdminAppService } from "../../../../../domain/application-services/usuario-admin/desativacao/desativacao-usuario-admin.app-service";

export class DesativacaoUsuarioAdminController extends ApiAdminController {
    private readonly appService = new DesativacaoUsuarioAdminAppService();

    async handle(routeContext: RouteContext) {
        const idUsuario = Number(routeContext.request.params.id);

        const responseAppService = await this.appService.handle({
            idUsuarioASerDesativado: idUsuario,
            idUsuarioRealizacaoOperacao: this.authenticatedUser(routeContext.request).idUsuario
        });
        this.result(routeContext, responseAppService, ResponseApiStatusCode.ATUALIZACAO);
    }
}
