import { EdicaoPedidoRequestApi } from "./edicao-pedido.request-api";
import { EdicaoPedidoAppService } from "../../../../../domain/application-services/pedido/edicao/edicao-pedido.app-service";
import { EdicaoPedidoRequest } from "../../../../../domain/application-services/pedido/edicao/edicao-pedido.request";
import { ApiAdminController } from "../../api-admin-controller";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";

export class EdicaoPedidoController extends ApiAdminController {
    private readonly appService = new EdicaoPedidoAppService();

    async handle(routeContext: RouteContext) {
        const requestAppService = (routeContext.request.body as EdicaoPedidoRequestApi) as EdicaoPedidoRequest;
        const responseAppService = await this.appService.handle(requestAppService);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.ATUALIZACAO);
    }
}
