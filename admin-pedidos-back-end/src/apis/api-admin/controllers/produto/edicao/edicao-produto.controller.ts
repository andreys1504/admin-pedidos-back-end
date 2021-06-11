import { EdicaoProdutoRequestApi } from "./edicao-produto.request-api";
import { EdicaoProdutoAppService } from "../../../../../domain/application-services/produto/edicao/edicao-produto.app-service";
import { EdicaoProdutoRequest } from "../../../../../domain/application-services/produto/edicao/edicao-produto.request";
import { ApiAdminController } from "../../api-admin-controller";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";

export class EdicaoProdutoController extends ApiAdminController {
    private readonly appService = new EdicaoProdutoAppService();

    async handle(routeContext: RouteContext) {
        const requestAppService = (routeContext.request.body as EdicaoProdutoRequestApi) as EdicaoProdutoRequest;
        requestAppService.idProduto = Number(routeContext.request.params.id);

        const responseAppService = await this.appService.handle(requestAppService);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.ATUALIZACAO);
    }
}
