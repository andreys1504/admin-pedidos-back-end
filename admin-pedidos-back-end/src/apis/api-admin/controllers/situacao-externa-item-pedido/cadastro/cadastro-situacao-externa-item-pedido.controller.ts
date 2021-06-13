import { CadastroSituacaoExternaItemPedidoRequestApi } from "./cadastro-situacao-externa-item.request-api";
import { CadastroSituacaoExternaItemPedidoAppService } from "../../../../../domain/application-services/situacao-externa-item-pedido/cadastro/cadastro-situacao-externa-item-pedido.app-service";
import { ApiAdminController } from "../../api-admin-controller";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { CadastroSituacaoExternaItemPedidoRequest } from "../../../../../domain/application-services/situacao-externa-item-pedido/cadastro/cadastro-situacao-externa-item-pedido.request";

export class CadastroSituacaoExternaItemPedidoController extends ApiAdminController {
    private readonly appService = new CadastroSituacaoExternaItemPedidoAppService();

    async handleAsync(routeContext: RouteContext) {
        const requestApi = routeContext.request.body as CadastroSituacaoExternaItemPedidoRequestApi;
        const requestAppService = new CadastroSituacaoExternaItemPedidoRequest({
            ...requestApi
        });
        const responseAppService = await this.appService.handleAsync(requestAppService);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.CADASTRO);
    }
}
