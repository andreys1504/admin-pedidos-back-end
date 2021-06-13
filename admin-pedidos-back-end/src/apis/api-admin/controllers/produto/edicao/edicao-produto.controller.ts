import { EdicaoProdutoRequestApi } from "./edicao-produto.request-api";
import { EdicaoProdutoAppService } from "../../../../../domain/application-services/produto/edicao/edicao-produto.app-service";
import { EdicaoProdutoRequest } from "../../../../../domain/application-services/produto/edicao/edicao-produto.request";
import { ApiAdminController } from "../../api-admin-controller";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";

export class EdicaoProdutoController extends ApiAdminController {
    private readonly appService = new EdicaoProdutoAppService();

    async handleAsync(routeContext: RouteContext) {
        const requestApi = (routeContext.request.body as EdicaoProdutoRequestApi);
        const requestAppService = new EdicaoProdutoRequest({
            ...requestApi,
            idProduto: Number(routeContext.request.params.id)
        });
        const responseAppService = await this.appService.handleAsync(requestAppService);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.ATUALIZACAO);
    }
}
