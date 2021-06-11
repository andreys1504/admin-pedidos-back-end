import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { TiposClienteAppService } from "../../../../../domain/application-services/tipo-cliente/tipos-cliente/tipos-cliente-cadastrados.app-service";

export class TiposClienteController extends ControllerApiAdmin {
    private readonly tiposClienteCadastradosServicoApp = new TiposClienteAppService();

    async executar(contexto: RouteContext) {
        const resultadoServico = await this.tiposClienteCadastradosServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.LISTAGEM);
    }
}
