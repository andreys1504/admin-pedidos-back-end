import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { TiposPedidoAppService } from "../../../../../domain/application-services/tipo-pedido/tipos-pedido/tipos-pedido.app-service";

export class TiposPedidosController extends ControllerApiAdmin {
    private readonly tiposPedidoServicoApp = new TiposPedidoAppService();
    
    async executar(contexto: RouteContext) {
        const tiposPedido = await this.tiposPedidoServicoApp.executar();
        this.resultadoController(contexto.resposta, tiposPedido, ResponseApiStatusCode.LISTAGEM);
    }
}
