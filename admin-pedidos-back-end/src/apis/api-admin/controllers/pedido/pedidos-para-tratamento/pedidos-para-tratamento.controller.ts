import { PedidosParaTratamentoRequestApi } from "./pedidos-para-tratamento.request-api";
import { PedidosParaTratamentoAppService } from "../../../../../domain/application-services/pedido/pedidos-para-tratamento/pedidos-para-tratamento.app-service";
import { PedidosParaTratamentoRequest } from "../../../../../domain/application-services/pedido/pedidos-para-tratamento/pedidos-para-tratamento.request";
import { ApiAdminController } from "../../api-admin-controller";
import { RouteContext } from "../../../configurations/routes/route-context";
import { recuperarValorBoleanoRequisicao } from "../../../../../core/helpers";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";

export class PedidosParaTratamentoController extends ApiAdminController {
    private readonly appService = new PedidosParaTratamentoAppService();

    async handle(routeContext: RouteContext) {
        const requestApi = routeContext.request.query as unknown as PedidosParaTratamentoRequestApi;
        requestApi.pedidosPendentes = recuperarValorBoleanoRequisicao(routeContext.request.query.pedidosPendentes as string);
        requestApi.pedidoRealizadoLojaVirtual = recuperarValorBoleanoRequisicao(routeContext.request.query.pedidoRealizadoLojaVirtual as string) || false;

        const requestAppService = requestApi as PedidosParaTratamentoRequest;
        const responseAppService = await this.appService.handle(requestAppService);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.LISTAGEM);
    }
}
