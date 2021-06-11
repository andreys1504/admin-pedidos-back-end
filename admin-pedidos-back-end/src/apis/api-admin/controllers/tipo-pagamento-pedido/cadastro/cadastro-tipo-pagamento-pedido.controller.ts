import { CadastroTipoPagamentoPedidoRequestApi } from "./cadastro-tipo-pagamento-pedido.request-api";
import { CadastroTipoPagamentoPedidoAppService } from "../../../../../domain/application-services/tipo-pagamento-pedido/cadastro-tipo-pagamento-pedido/cadastro-tipo-pagamento-pedido.app-service";
import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";

export class CadastroTipoPagamentoPedidoController extends ControllerApiAdmin {
    private readonly cadastroTipoPagamentoPedidoServicoApp = new CadastroTipoPagamentoPedidoAppService();

    async executar(contexto: RouteContext) {
        const modelServicoApp = contexto.requisicao.body as CadastroTipoPagamentoPedidoRequestApi;
        const resultadoServico = await this.cadastroTipoPagamentoPedidoServicoApp.executar(modelServicoApp);
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.CADASTRO);
    }
}
