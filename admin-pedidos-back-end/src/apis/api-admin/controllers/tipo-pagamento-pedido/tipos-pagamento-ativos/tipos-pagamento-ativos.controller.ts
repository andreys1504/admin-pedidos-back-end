import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { TiposPagamentoAtivosAppService } from "../../../../../domain/application-services/tipo-pagamento-pedido/tipos-pagamento-ativos/tipos-pagamento-ativos.app-service";

export class TiposPagamentoAtivosController extends ApiAdminController {
    private readonly appService = new TiposPagamentoAtivosAppService();
    
    async handle(routeContext: RouteContext) {
        const responseAppService = await this.appService.handle();
        this.result(routeContext, responseAppService, ResponseApiStatusCode.LISTAGEM);
    }
}
