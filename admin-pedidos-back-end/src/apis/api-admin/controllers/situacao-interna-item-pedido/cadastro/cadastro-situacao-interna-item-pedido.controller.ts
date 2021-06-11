import { CadastroSituacaoInternaItemRequestApi } from "./cadastro-situacao-interna-item.request-api";
import { CadastroSituacaoInternaItemPedidoAppService } from "../../../../../domain/application-services/situacao-interna-item-pedido/cadastro/cadastro-situacao-interna-item-pedido.app-service";
import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";

export class CadastroSituacaoInternaItemPedidoController extends ControllerApiAdmin {
    private readonly cadatroSituacaoInternaItemPedidoServicoApp = new CadastroSituacaoInternaItemPedidoAppService();

    async executar(contexto: RouteContext) {
        const modelServicoApp = contexto.requisicao.body as CadastroSituacaoInternaItemRequestApi;
        const resultadoServico = await this.cadatroSituacaoInternaItemPedidoServicoApp.executar(modelServicoApp);
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.CADASTRO);
    }
}
