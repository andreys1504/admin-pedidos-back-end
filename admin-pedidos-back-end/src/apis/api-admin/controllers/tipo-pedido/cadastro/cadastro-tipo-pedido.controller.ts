import { CadastroTipoPedidoRequestApi } from "./cadastro-tipo-pedido.request-api";
import { CadastroTipoPedidoAppService } from "../../../../../domain/application-services/tipo-pedido/cadastro/cadastro-tipo-pedido.app-service";
import { ApiAdminController } from "../../api-admin-controller";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";

export class CadastroTipoPedidoController extends ApiAdminController {
    private readonly appService = new CadastroTipoPedidoAppService();

    async handle(routeContext: RouteContext) {
        const requestApi = routeContext.request.body as CadastroTipoPedidoRequestApi;
        const responseAppService = await this.appService.handle(requestApi);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.CADASTRO);
    }
}
