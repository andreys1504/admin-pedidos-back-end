import { CadastroTipoPagamentoPedidoRequestApi } from "./cadastro-tipo-pagamento-pedido.request-api";
import { CadastroTipoPagamentoPedidoAppService } from "../../../../../domain/application-services/tipo-pagamento-pedido/cadastro-tipo-pagamento-pedido/cadastro-tipo-pagamento-pedido.app-service";
import { ApiAdminController } from "../../api-admin-controller";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { CadastroTipoPagamentoRequest } from "../../../../../domain/application-services/tipo-pagamento-pedido/cadastro-tipo-pagamento-pedido/cadastro-tipo-pagamento.request";

export class CadastroTipoPagamentoPedidoController extends ApiAdminController {
    private readonly appService = new CadastroTipoPagamentoPedidoAppService();

    async handleAsync(routeContext: RouteContext) {
        const requestApi = routeContext.request.body as CadastroTipoPagamentoPedidoRequestApi;
        const requestAppService = new CadastroTipoPagamentoRequest({
            id: requestApi.id,
            descricao: requestApi.descricao,
            ativo: requestApi.ativo
          });
        const responseAppService = await this.appService.handleAsync(requestAppService);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.CADASTRO);
    }
}
