import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ClientesParaEdicaoDadosAppService } from "../../../../../domain/application-services/cliente/clientes-para-edicao-dados/clientes-para-edicao-dados.app-service";

export class ClientesParaEdicaoDadosController extends ApiAdminController {
    private readonly appService = new ClientesParaEdicaoDadosAppService();

    async handle(routeContext: RouteContext) {
        const nomeCpfCnpj = routeContext.request.params.nomeCpfCnpj;
        const responseAppService = await this.appService.handle({ nomeCpfCnpj });
        this.result(routeContext, responseAppService, ResponseApiStatusCode.LISTAGEM);
    }
}
