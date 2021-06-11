import { CadastroProdutoRequestApi } from "./cadastro-produto.request-api";
import { CadastroProdutoAppService } from "../../../../../domain/application-services/produto/cadastro/cadastro-produto.app-service";
import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";

export class CadastroProdutoController extends ControllerApiAdmin {
    private readonly cadastroProdutoServicoApp = new CadastroProdutoAppService();

    async executar(contexto: RouteContext) {
        const requisicao = (contexto.requisicao.body as CadastroProdutoRequestApi);
        const resultadoServico = await this.cadastroProdutoServicoApp.executar(requisicao);
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.CADASTRO);
    }
}
