import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { TiposPedidoAtivosAppService } from "../../../../../domain/application-services/tipo-pedido/tipos-pedido-ativos/tipos-pedido-ativos.app-service";

export class TiposPedidoAtivosController extends ControllerApiAdmin {
    private readonly tiposPedidoAtivosServico = new TiposPedidoAtivosAppService();

    async executar(contexto: RouteContext) {
        const resultadoServico = await this.tiposPedidoAtivosServico.executar();
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.LISTAGEM);
    }
}
