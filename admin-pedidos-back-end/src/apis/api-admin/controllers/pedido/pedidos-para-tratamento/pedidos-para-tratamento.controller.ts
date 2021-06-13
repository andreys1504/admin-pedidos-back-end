import { PedidosParaTratamentoRequestApi } from "./pedidos-para-tratamento.request-api";
import { PedidosParaTratamentoAppService } from "../../../../../domain/application-services/pedido/pedidos-para-tratamento/pedidos-para-tratamento.app-service";
import { PedidosParaTratamentoRequest } from "../../../../../domain/application-services/pedido/pedidos-para-tratamento/pedidos-para-tratamento.request";
import { ApiAdminController } from "../../api-admin-controller";
import { RouteContext } from "../../../configurations/routes/route-context";
import { getBooleanValueRequest } from "../../../../../core/helpers";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";

export class PedidosParaTratamentoController extends ApiAdminController {
    private readonly appService = new PedidosParaTratamentoAppService();

    async handleAsync(routeContext: RouteContext) {
        const requestApi = routeContext.request.query as unknown as PedidosParaTratamentoRequestApi;
        requestApi.pedidosPendentes = getBooleanValueRequest(routeContext.request.query.pedidosPendentes as string);
        
        const requestAppService = new PedidosParaTratamentoRequest({
            ...requestApi
        });
        const responseAppService = await this.appService.handleAsync(requestAppService);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.LISTAGEM);
    }
}
