import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { TiposProdutosAtivosAppService } from "../../../../../domain/application-services/tipo-produto/tipos-produtos-ativos/tipos-produtos-ativos.app-service";

export class TiposProdutoAtivosController extends ControllerApiAdmin {
    private readonly tiposProdutosAtivosServicoApp = new TiposProdutosAtivosAppService();

    async executar(contexto: RouteContext) {
        const resultadoServico = await this.tiposProdutosAtivosServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.LISTAGEM);
    }
}
