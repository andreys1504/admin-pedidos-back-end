import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ProdutosParaCadastroPedidoAppService } from "../../../../../domain/application-services/produto/produtos-para-cadastro-pedido/produtos-para-cadastro-pedido.app-service";

export class ProdutosParaCadastroPedidoController extends ApiAdminController {
    private readonly produtosParaCadastroPedidoAppService = new ProdutosParaCadastroPedidoAppService();

    async handleAsync(routeContext: RouteContext) {
        const responseAppService = await this.produtosParaCadastroPedidoAppService.handleAsync();
        this.result(routeContext, responseAppService, ResponseApiStatusCode.LISTAGEM);
    }
}
