import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { ProdutosParaCadastroPedidoAppService } from "../../../../../domain/application-services/produto/produtos-para-cadastro-pedido/produtos-para-cadastro-pedido.app-service";

export class ProdutosParaCadastroPedidoController extends ControllerApiAdmin {
    private readonly produtosParaCadastroPedidoServicoApp = new ProdutosParaCadastroPedidoAppService();

    async executar(contexto: RouteContext) {
        const resultadoServico = await this.produtosParaCadastroPedidoServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.LISTAGEM);
    }
}
