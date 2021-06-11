import { CadastroTipoPedidoRequestApi } from "./cadastro-tipo-pedido.request-api";
import { CadastroTipoPedidoAppService } from "../../../../../domain/application-services/tipo-pedido/cadastro/cadastro-tipo-pedido.app-service";
import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";

export class CadastroTipoPedidoController extends ControllerApiAdmin {
    private readonly cadastroTipoPedidoServicoApp = new CadastroTipoPedidoAppService();

    async executar(contexto: RouteContext) {
        const modelServicoApp = contexto.requisicao.body as CadastroTipoPedidoRequestApi;
        const resultadoServico = await this.cadastroTipoPedidoServicoApp.executar(modelServicoApp);
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.CADASTRO);
    }
}
