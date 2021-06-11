import { CadastroTipoPagamentoPedidoRequestApi } from "./cadastro-tipo-pagamento-pedido.request-api";
import { CadastroTipoPagamentoPedidoAppService } from "../../../../../domain/application-services/tipo-pagamento-pedido/cadastro-tipo-pagamento-pedido/cadastro-tipo-pagamento-pedido.app-service";
import { ApiAdminController } from "../../api-admin-controller";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";

export class CadastroTipoPagamentoPedidoController extends ApiAdminController {
    private readonly appService = new CadastroTipoPagamentoPedidoAppService();

    async handle(routeContext: RouteContext) {
        const requestApi = routeContext.request.body as CadastroTipoPagamentoPedidoRequestApi;
        const responseAppService = await this.appService.handle(requestApi);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.CADASTRO);
    }
}
