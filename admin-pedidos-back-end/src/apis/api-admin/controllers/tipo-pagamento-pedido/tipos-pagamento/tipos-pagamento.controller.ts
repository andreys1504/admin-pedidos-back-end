import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { TiposPagamentoAppService } from "../../../../../domain/application-services/tipo-pagamento-pedido/tipos-pagamento/tipos-pagamento.app-service";

export class TiposPagamentoController extends ApiAdminController {
    private readonly appService = new TiposPagamentoAppService();

    async handle(routeContext: RouteContext) {
        const responseAppService = await this.appService.handle();
        this.result(routeContext, responseAppService, ResponseApiStatusCode.LISTAGEM);
    }
}
