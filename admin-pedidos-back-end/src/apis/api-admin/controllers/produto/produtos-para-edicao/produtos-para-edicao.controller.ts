import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { ProdutosParaEdicaoAppService } from "../../../../../domain/application-services/produto/produtos-para-edicao/produtos-para-edicao.app-service";

export class ProdutosParaEdicaoController extends ControllerApiAdmin {
    private readonly produtosParaEdicaoServicoApp = new ProdutosParaEdicaoAppService();

    async executar(contexto: RouteContext) {
        const descricao = contexto.requisicao.query.descricao;
        const resultadoServico =
            await this.produtosParaEdicaoServicoApp.executar({
                descricao: descricao as string,
                idProduto: 0,
            });

        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.LISTAGEM);
    }
}
