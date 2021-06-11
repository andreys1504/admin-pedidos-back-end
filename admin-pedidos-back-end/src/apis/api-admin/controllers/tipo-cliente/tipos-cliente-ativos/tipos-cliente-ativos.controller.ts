import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { TiposClienteAtivosAppService } from "../../../../../domain/application-services/tipo-cliente/tipos-cliente-ativos/tipos-cliente-ativos.app-service";

export class TiposClienteAtivosController extends ControllerApiAdmin {
    private readonly tiposClienteAtivosServicoApp = new TiposClienteAtivosAppService();

    async executar(contexto: RouteContext) {
        const resultadoServico = await this.tiposClienteAtivosServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.LISTAGEM);
    }
}
