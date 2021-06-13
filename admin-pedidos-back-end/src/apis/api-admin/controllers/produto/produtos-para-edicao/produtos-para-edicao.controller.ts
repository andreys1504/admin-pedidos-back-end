import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ProdutosParaEdicaoAppService } from "../../../../../domain/application-services/produto/produtos-para-edicao/produtos-para-edicao.app-service";
import { ProdutosParaEdicaoRequest } from "../../../../../domain/application-services/produto/produtos-para-edicao/produtos-para-edicao.request";

export class ProdutosParaEdicaoController extends ApiAdminController {
  private readonly appService = new ProdutosParaEdicaoAppService();

  async handleAsync(routeContext: RouteContext) {
    const descricao = routeContext.request.query.descricao;
    const requestAppService = new ProdutosParaEdicaoRequest({
      descricao: descricao as string,
      idProduto: 0,
    });
    const responseAppService = await this.appService.handleAsync(
      requestAppService
    );

    this.result(
      routeContext,
      responseAppService,
      ResponseApiStatusCode.LISTAGEM
    );
  }
}
