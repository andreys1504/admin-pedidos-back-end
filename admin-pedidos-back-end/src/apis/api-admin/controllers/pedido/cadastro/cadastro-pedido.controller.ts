import { CadastroPedidoRequestApi } from "./cadastro-pedido.request-api";
import { CadastroPedidoAppService } from "../../../../../domain/application-services/pedido/cadastro/cadastro-pedido.app-service";
import { CadastroPedidoRequest } from "../../../../../domain/application-services/pedido/cadastro/cadastro-pedido.request";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";

export class CadastroPedidoController extends ApiAdminController {
    private readonly appService = new CadastroPedidoAppService();

    async handleAsync(routeContext: RouteContext) {
        const idUsuarioRegistroPedido = this.authenticatedUser(routeContext.request).idUsuario;
        const requestApi = (routeContext.request.body as CadastroPedidoRequestApi);
        const requestAppService = new CadastroPedidoRequest({
            ...requestApi,
            idUsuarioRegistroPedido: idUsuarioRegistroPedido
        });
        const responseAppService = await this.appService.handleAsync(requestAppService);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.CADASTRO);
    }
}
