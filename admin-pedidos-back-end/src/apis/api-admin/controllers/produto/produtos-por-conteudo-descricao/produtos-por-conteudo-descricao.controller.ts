import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { ProdutosPorConteudoDescricaoAppService } from "../../../../../domain/application-services/produto/produtos-por-conteudo-descricao/produtos-por-conteudo-descricao.app-service";

export class ProdutosPorConteudoDescricaoController extends ControllerApiAdmin {
    private readonly produtosPorConteudoDescricaoServicoApp = new ProdutosPorConteudoDescricaoAppService();

    async executar(contexto: RouteContext) {
        const descricao = contexto.requisicao.params.descricao;
        const resultadoServico = await this.produtosPorConteudoDescricaoServicoApp.executar({ descricao });
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.LISTAGEM);
    }
}
