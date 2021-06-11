import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { SituacoesExternasPedidoAppService } from "../../../../../domain/application-services/situacao-externa-pedido/situacoes-externas-pedido/situacoes-externas-pedido.app-service";

export class SituacoesExternasPedidoController extends ControllerApiAdmin {
    private readonly situacoesExternasPedidoServicoApp = new SituacoesExternasPedidoAppService();
    
    async executar(contexto: RouteContext) {
        const resultadoServico = await this.situacoesExternasPedidoServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.LISTAGEM);
    }
}
