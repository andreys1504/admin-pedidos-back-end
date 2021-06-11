import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { PedidosCadastradosAppService } from "../../../../../domain/application-services/pedido/pedidos-cadastrados/pedidos-cadastrados.app-service";

export class PedidosCadastradosController extends ControllerApiAdmin {
    private readonly _pedidosServicoApp = new PedidosCadastradosAppService();

    async executar(contexto: RouteContext) {
        const resultadoServico = await this._pedidosServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.LISTAGEM);
    }
}
