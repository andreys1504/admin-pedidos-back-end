import { CadastroSituacaoExternaItemPedidoRequestApi } from "./cadastro-situacao-externa-item.request-api";
import { CadastroSituacaoExternaItemPedidoAppService } from "../../../../../domain/application-services/situacao-externa-item-pedido/cadastro/cadastro-situacao-externa-item-pedido.app-service";
import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";

export class CadastroSituacaoExternaItemPedidoController extends ControllerApiAdmin {
    private readonly cadastroSituacaoExternaItemPedidoServicoApp = new CadastroSituacaoExternaItemPedidoAppService();

    async executar(contexto: RouteContext) {
        const modelServicoApp = contexto.requisicao.body as CadastroSituacaoExternaItemPedidoRequestApi;
        const resultadoServico = await this.cadastroSituacaoExternaItemPedidoServicoApp.executar(modelServicoApp);
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.CADASTRO);
    }
}
