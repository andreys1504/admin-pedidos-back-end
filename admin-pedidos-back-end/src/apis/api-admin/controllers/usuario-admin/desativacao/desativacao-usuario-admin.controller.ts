import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { DesativacaoUsuarioAdminAppService } from "../../../../../domain/application-services/usuario-admin/desativacao/desativacao-usuario-admin.app-service";

export class DesativacaoUsuarioAdminController extends ControllerApiAdmin {
    private readonly desativacaoUsuarioAdminServicoApp = new DesativacaoUsuarioAdminAppService();

    async executar(contexto: RouteContext) {
        const idUsuario = Number(contexto.requisicao.params.id);

        const resultadoServico = await this.desativacaoUsuarioAdminServicoApp.executar({
            idUsuarioASerDesativado: idUsuario,
            idUsuarioRealizacaoOperacao: this.dadosTokenAutenticacaoUsuarioAdmin(contexto.requisicao).idUsuario
        });
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.ATUALIZACAO);
    }
}
