import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { TiposProdutosCadastradosAppService } from "../../../../../domain/application-services/tipo-produto/tipos-produtos-cadastrados/tipos-produtos-cadastrados.app-service";

export class TiposProdutoCadastradosController extends ControllerApiAdmin {
    private readonly tiposProdutosCadastradosServicoApp = new TiposProdutosCadastradosAppService();

    async executar(contexto: RouteContext) {
        const resultadoServico = await this.tiposProdutosCadastradosServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.LISTAGEM);
    }
}
