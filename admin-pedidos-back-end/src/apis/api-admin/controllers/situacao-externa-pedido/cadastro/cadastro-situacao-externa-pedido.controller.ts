import { CadastroSituacaoExternaPedidoRequestApi } from "./cadastro-situacao-externa-pedido.request-api";
import { CadastroSituacaoExternaPedidoAppService } from "../../../../../domain/application-services/situacao-externa-pedido/cadastro/cadastro-situacao-externa-pedido.app-service";
import { ApiAdminController } from "../../api-admin-controller";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";

export class CadastroSituacaoExternaPedidoController extends ApiAdminController {
    private readonly appService = new CadastroSituacaoExternaPedidoAppService();

    async handle(routeContext: RouteContext) {
        const requestApi = routeContext.request.body as CadastroSituacaoExternaPedidoRequestApi;
        const responseAppService = await this.appService.handle(requestApi);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.CADASTRO);
    }
}
