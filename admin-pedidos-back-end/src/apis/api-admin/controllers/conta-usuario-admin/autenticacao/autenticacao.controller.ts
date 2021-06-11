import { AutenticacaoRequestApi } from "./autenticacao.request-api";
import { AutenticacaoRequest } from "../../../../../domain/application-services/conta-usuario-admin/autenticacao/autenticacao.request";
import { AutenticacaoAppService } from "../../../../../domain/application-services/conta-usuario-admin/autenticacao/autenticacao.app-service";
import { ApiAdminController } from "../../api-admin-controller";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";

export class AutenticacaoController extends ApiAdminController {
    private readonly appService = new AutenticacaoAppService();

    async handle(routeContext: RouteContext) {
        const requestApi = routeContext.request.body as AutenticacaoRequestApi;
        const requestAppService = requestApi as AutenticacaoRequest;

        const responseAppService = await this.appService.handle(requestAppService);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.SUCESSO);
    }
}
