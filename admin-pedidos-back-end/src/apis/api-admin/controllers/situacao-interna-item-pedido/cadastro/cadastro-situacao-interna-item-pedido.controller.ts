import { CadastroSituacaoInternaItemRequestApi } from "./cadastro-situacao-interna-item.request-api";
import { CadastroSituacaoInternaItemPedidoAppService } from "../../../../../domain/application-services/situacao-interna-item-pedido/cadastro/cadastro-situacao-interna-item-pedido.app-service";
import { ApiAdminController } from "../../api-admin-controller";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";

export class CadastroSituacaoInternaItemPedidoController extends ApiAdminController {
    private readonly appService = new CadastroSituacaoInternaItemPedidoAppService();

    async handle(routeContext: RouteContext) {
        const requestApi = routeContext.request.body as CadastroSituacaoInternaItemRequestApi;
        const responseAppService = await this.appService.handle(requestApi);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.CADASTRO);
    }
}
