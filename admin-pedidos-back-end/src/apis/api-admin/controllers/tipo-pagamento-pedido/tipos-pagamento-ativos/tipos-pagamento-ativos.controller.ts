import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { TiposPagamentoAtivosAppService } from "../../../../../domain/application-services/tipo-pagamento-pedido/tipos-pagamento-ativos/tipos-pagamento-ativos.app-service";

export class TiposPagamentoAtivosController extends ControllerApiAdmin {
    private readonly tiposPagamentoAtivosServicoApp = new TiposPagamentoAtivosAppService();
    
    async executar(contexto: RouteContext) {
        const resultadoServico = await this.tiposPagamentoAtivosServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.LISTAGEM);
    }
}
