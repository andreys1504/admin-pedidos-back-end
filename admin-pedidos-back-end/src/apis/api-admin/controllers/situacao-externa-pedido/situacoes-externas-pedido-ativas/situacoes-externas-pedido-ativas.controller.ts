import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { SituacoesExternasPedidoAtivasAppService } from "../../../../../domain/application-services/situacao-externa-pedido/situacoes-externas-pedido-ativas/situacoes-externas-pedido-ativas.app-service";

export class SituacoesExternasPedidoAtivasController extends ControllerApiAdmin {
    private readonly situacoesExternasPedidoAtivasServicoApp = new SituacoesExternasPedidoAtivasAppService();
    
    async executar(contexto: RouteContext) {
        const resultadoServico = await this.situacoesExternasPedidoAtivasServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.LISTAGEM);
    }
}
