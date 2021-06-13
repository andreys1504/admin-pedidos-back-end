import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ClienteParaCadastroAppService } from "../../../../../domain/application-services/cliente/clientes-para-cadastro-pedido/clientes-para-cadastro-pedido.app-service";
import { ClientesParaCadastroPedidoRequest } from "../../../../../domain/application-services/cliente/clientes-para-cadastro-pedido/clientes-para-cadastro-pedido.request";

export class ClientesParaCadastroPedidoController extends ApiAdminController {
    private readonly appService = new ClienteParaCadastroAppService();

    async handleAsync(routeContext: RouteContext) {
        const nomeCpfCnpj = routeContext.request.params.nomeCpfCnpj;
        const requestAppService = new ClientesParaCadastroPedidoRequest({
            nomeCpfCnpj
        });
        const responseAppService = await this.appService.handleAsync(requestAppService);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.LISTAGEM);
    }
}
