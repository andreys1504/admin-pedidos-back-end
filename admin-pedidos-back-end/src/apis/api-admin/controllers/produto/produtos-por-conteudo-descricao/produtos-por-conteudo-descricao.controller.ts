import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ProdutosPorConteudoDescricaoAppService } from "../../../../../domain/application-services/produto/produtos-por-conteudo-descricao/produtos-por-conteudo-descricao.app-service";
import { ProdutosPorConteudoDescricaoRequest } from "../../../../../domain/application-services/produto/produtos-por-conteudo-descricao/produtos-por-conteudo-descricao.request";

export class ProdutosPorConteudoDescricaoController extends ApiAdminController {
    private readonly appService = new ProdutosPorConteudoDescricaoAppService();

    async handleAsync(routeContext: RouteContext) {
        const descricao = routeContext.request.params.descricao;
        const requestAppService = new ProdutosPorConteudoDescricaoRequest({
            descricao
        });
        const responseAppService = await this.appService.handleAsync(requestAppService);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.LISTAGEM);
    }
}
