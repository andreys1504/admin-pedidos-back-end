import { EdicaoProdutoRequestApi } from "./edicao-produto.request-api";
import { EdicaoProdutoAppService } from "../../../../../domain/application-services/produto/edicao/edicao-produto.app-service";
import { EdicaoProdutoRequest } from "../../../../../domain/application-services/produto/edicao/edicao-produto.request";
import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";

export class EdicaoProdutoController extends ControllerApiAdmin {
    private readonly edicaoProdutoServicoApp = new EdicaoProdutoAppService();

    async executar(contexto: RouteContext) {
        const modelServicoApp = (contexto.requisicao.body as EdicaoProdutoRequestApi) as EdicaoProdutoRequest;
        modelServicoApp.idProduto = Number(contexto.requisicao.params.id);

        const resultadoServico = await this.edicaoProdutoServicoApp.executar(modelServicoApp);
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.ATUALIZACAO);
    }
}
