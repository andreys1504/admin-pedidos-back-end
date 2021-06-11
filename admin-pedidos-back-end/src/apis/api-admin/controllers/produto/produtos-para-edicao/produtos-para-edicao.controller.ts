import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ProdutosParaEdicaoAppService } from "../../../../../domain/application-services/produto/produtos-para-edicao/produtos-para-edicao.app-service";

export class ProdutosParaEdicaoController extends ApiAdminController {
  private readonly appService = new ProdutosParaEdicaoAppService();

  async handle(routeContext: RouteContext) {
    const descricao = routeContext.request.query.descricao;
    const responseAppService = await this.appService.handle({
      descricao: descricao as string,
      idProduto: 0,
    });

    this.result(
      routeContext,
      responseAppService,
      ResponseApiStatusCode.LISTAGEM
    );
  }
}
