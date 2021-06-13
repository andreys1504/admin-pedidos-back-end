import { CadastroProdutoRequestApi } from "./cadastro-produto.request-api";
import { CadastroProdutoAppService } from "../../../../../domain/application-services/produto/cadastro/cadastro-produto.app-service";
import { ApiAdminController } from "../../api-admin-controller";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { CadastroProdutoRequest } from "../../../../../domain/application-services/produto/cadastro/cadastro-produto.request";

export class CadastroProdutoController extends ApiAdminController {
    private readonly appService = new CadastroProdutoAppService();

    async handleAsync(routeContext: RouteContext) {
        const requestApi = (routeContext.request.body as CadastroProdutoRequestApi);
        const requestAppService = new CadastroProdutoRequest({
            ...requestApi
        })
        const responseAppService = await this.appService.handleAsync(requestAppService);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.CADASTRO);
    }
}
