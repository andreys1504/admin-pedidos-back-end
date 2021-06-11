import { AutenticacaoRequestApi } from "./autenticacao.request-api";
import { AutenticacaoRequest } from "../../../../../domain/application-services/conta-usuario-admin/autenticacao/autenticacao.request";
import { AutenticacaoAppService } from "../../../../../domain/application-services/conta-usuario-admin/autenticacao/autenticacao.app-service";
import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";

export class AutenticacaoController extends ControllerApiAdmin {
    private readonly autenticacaoServicoApp = new AutenticacaoAppService();

    async executar(contexto: RouteContext) {
        const dadosAutenticacao = contexto.requisicao.body as AutenticacaoRequestApi;
        const dadosServicoApp = dadosAutenticacao as AutenticacaoRequest;

        const resultadoServico = await this.autenticacaoServicoApp.executar(dadosServicoApp);
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.SUCESSO);
    }
}
