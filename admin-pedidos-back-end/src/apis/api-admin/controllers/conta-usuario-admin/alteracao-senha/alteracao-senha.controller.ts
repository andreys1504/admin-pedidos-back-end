import { AlteracaoSenhaRequestApi } from "./alteracao-senha.request-api";
import { AlteracaoSenhaRequest } from "../../../../../domain/application-services/conta-usuario-admin/alteracao-senha/alteracao-senha.request";
import { AlteracaoSenhaAppService } from "../../../../../domain/application-services/conta-usuario-admin/alteracao-senha/alteracao-senha.app-service";
import { ApiAdminController } from "../../api-admin-controller";
import { RouteContext } from "../../../configurations/routes/route-context";
import { GlobalSettings } from "../../../../../core/configurations/global-settings";
import { tokenService } from "../../../configurations/routes/security/token-service";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";

export class AlteracaoSenhaController extends ApiAdminController {
    private readonly appService = new AlteracaoSenhaAppService();

    async handleAsync(routeContext: RouteContext) {
        const requestApi = routeContext.request.body as AlteracaoSenhaRequestApi;

        const tokenDecodificado = tokenService
            .decodeToken(
                tokenService.getToken(routeContext.request),
                GlobalSettings.APIS_SALT_KEY);

        const requestAppService = new AlteracaoSenhaRequest({
            senhaAtual: requestApi.senhaAtual,
            novaSenha: requestApi.novaSenha,
            confirmacaoNovaSenha: requestApi.confirmacaoNovaSenha,
            nomeUsuario: tokenDecodificado.nomeUsuario
        });

        const responseAppService = await this.appService.handleAsync(requestAppService);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.ATUALIZACAO);
    }
}