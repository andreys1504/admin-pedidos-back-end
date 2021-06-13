import { EdicaoClienteRequestApi } from "./edicao-cliente.request-api";
import { EdicaoClienteAppService } from "../../../../../domain/application-services/cliente/edicao/edicao-cliente.app-service";
import { EdicaoClienteRequest } from "../../../../../domain/application-services/cliente/edicao/edicao-cliente.request";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";

export class EdicaoClienteController extends ApiAdminController {
    private readonly appService = new EdicaoClienteAppService();

    async handleAsync(routeContext: RouteContext) {
        const idCliente = routeContext.request.params.id;
        const requestApi = routeContext.request.body as EdicaoClienteRequestApi;
        const requestAppService = new EdicaoClienteRequest({
            ...requestApi,
            idCliente: +idCliente
        });
        const responseAppService = await this.appService.handleAsync(requestAppService);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.ATUALIZACAO);
    }
}
