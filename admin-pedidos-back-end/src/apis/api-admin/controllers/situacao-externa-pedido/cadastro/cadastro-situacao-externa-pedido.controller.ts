import { CadastroSituacaoExternaPedidoRequestApi } from "./cadastro-situacao-externa-pedido.request-api";
import { CadastroSituacaoExternaPedidoAppService } from "../../../../../domain/application-services/situacao-externa-pedido/cadastro/cadastro-situacao-externa-pedido.app-service";
import { ApiAdminController } from "../../api-admin-controller";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { CadastroSituacaoExternaPedidoRequest } from "../../../../../domain/application-services/situacao-externa-pedido/cadastro/cadastro-situacao-externa-pedido.request";

export class CadastroSituacaoExternaPedidoController extends ApiAdminController {
    private readonly appService = new CadastroSituacaoExternaPedidoAppService();

    async handleAsync(routeContext: RouteContext) {
        const requestApi = routeContext.request.body as CadastroSituacaoExternaPedidoRequestApi;
        const requestAppService = new CadastroSituacaoExternaPedidoRequest({
            id: requestApi.id,
            descricao: requestApi.descricao,
            ativo: requestApi.ativo
          });
        const responseAppService = await this.appService.handleAsync(requestAppService);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.CADASTRO);
    }
}
