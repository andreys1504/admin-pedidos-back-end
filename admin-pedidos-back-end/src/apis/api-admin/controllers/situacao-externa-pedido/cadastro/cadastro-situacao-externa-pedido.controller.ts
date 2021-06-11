import { CadastroSituacaoExternaPedidoRequestApi } from "./cadastro-situacao-externa-pedido.request-api";
import { CadastroSituacaoExternaPedidoAppService } from "../../../../../domain/application-services/situacao-externa-pedido/cadastro/cadastro-situacao-externa-pedido.app-service";
import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";

export class CadastroSituacaoExternaPedidoController extends ControllerApiAdmin {
    private readonly cadastroSituacaoExternaPedidoServicoApp = new CadastroSituacaoExternaPedidoAppService();

    async executar(contexto: RouteContext) {
        const modelServicoApp = contexto.requisicao.body as CadastroSituacaoExternaPedidoRequestApi;
        const resultadoServico = await this.cadastroSituacaoExternaPedidoServicoApp.executar(modelServicoApp);
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.CADASTRO);
    }
}
