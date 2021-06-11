import { CadastroProdutoRequestApi } from "./cadastro-produto.request-api";
import { CadastroProdutoAppService } from "../../../../../domain/application-services/produto/cadastro/cadastro-produto.app-service";
import { ApiAdminController } from "../../api-admin-controller";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";

export class CadastroProdutoController extends ApiAdminController {
    private readonly appService = new CadastroProdutoAppService();

    async handle(routeContext: RouteContext) {
        const requestApi = (routeContext.request.body as CadastroProdutoRequestApi);
        const responseAppService = await this.appService.handle(requestApi);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.CADASTRO);
    }
}
