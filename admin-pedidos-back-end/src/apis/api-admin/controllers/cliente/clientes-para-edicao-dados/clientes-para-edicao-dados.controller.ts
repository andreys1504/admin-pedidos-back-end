import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ClientesParaEdicaoDadosAppService } from "../../../../../domain/application-services/cliente/clientes-para-edicao-dados/clientes-para-edicao-dados.app-service";
import { ClientesParaEdicaoDadosRequest } from "../../../../../domain/application-services/cliente/clientes-para-edicao-dados/clientes-para-edicao-dados.request";

export class ClientesParaEdicaoDadosController extends ApiAdminController {
    private readonly appService = new ClientesParaEdicaoDadosAppService();

    async handleAsync(routeContext: RouteContext) {
        const nomeCpfCnpj = routeContext.request.params.nomeCpfCnpj;
        const requestAppService = new ClientesParaEdicaoDadosRequest({ nomeCpfCnpj });
        const responseAppService = await this.appService.handleAsync(requestAppService);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.LISTAGEM);
    }
}
