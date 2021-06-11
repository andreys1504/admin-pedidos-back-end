import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { PedidosCadastradosAppService } from "../../../../../domain/application-services/pedido/pedidos-cadastrados/pedidos-cadastrados.app-service";

export class PedidosCadastradosController extends ApiAdminController {
    private readonly appService = new PedidosCadastradosAppService();

    async handle(routeContext: RouteContext) {
        const responseAppService = await this.appService.handle();
        this.result(routeContext, responseAppService, ResponseApiStatusCode.LISTAGEM);
    }
}
