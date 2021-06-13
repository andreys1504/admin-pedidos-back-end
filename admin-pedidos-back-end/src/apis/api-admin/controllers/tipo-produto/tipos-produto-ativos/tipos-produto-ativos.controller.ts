import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { TiposProdutosAtivosAppService } from "../../../../../domain/application-services/tipo-produto/tipos-produtos-ativos/tipos-produtos-ativos.app-service";

export class TiposProdutoAtivosController extends ApiAdminController {
    private readonly appService = new TiposProdutosAtivosAppService();

    async handleAsync(routeContext: RouteContext) {
        const responseAppService = await this.appService.handleAsync();
        this.result(routeContext, responseAppService, ResponseApiStatusCode.LISTAGEM);
    }
}
