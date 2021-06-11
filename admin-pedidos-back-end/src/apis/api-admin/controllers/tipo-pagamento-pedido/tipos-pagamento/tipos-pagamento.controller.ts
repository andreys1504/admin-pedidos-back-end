import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { TiposPagamentoAppService } from "../../../../../domain/application-services/tipo-pagamento-pedido/tipos-pagamento/tipos-pagamento.app-service";

export class TiposPagamentoController extends ControllerApiAdmin {
    private readonly tiposPagamentoServicoApp = new TiposPagamentoAppService();

    async executar(contexto: RouteContext) {
        const resultadoServico = await this.tiposPagamentoServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.LISTAGEM);
    }
}
