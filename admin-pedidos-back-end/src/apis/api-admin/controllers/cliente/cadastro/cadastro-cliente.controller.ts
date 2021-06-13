import { CadastroClienteRequestApi } from "./cadastro-cliente.request-api";
import { CadastroClienteAppService } from "../../../../../domain/application-services/cliente/cadastro/cadastro-cliente.app-service";
import { CadastroClienteRequest } from "../../../../../domain/application-services/cliente/cadastro/cadastro-cliente.request";
import { ApiAdminController } from "../../api-admin-controller";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";

export class CadastroClienteController extends ApiAdminController {
    private readonly appService = new CadastroClienteAppService();

    async handleAsync(routeContext: RouteContext) {
        const requestApi = routeContext.request.body as CadastroClienteRequestApi;
        const requestAppService = new CadastroClienteRequest(requestApi);
        const responseAppService = await this.appService.handleAsync(requestAppService);

        this.result(routeContext, responseAppService, ResponseApiStatusCode.CADASTRO);
    }
}