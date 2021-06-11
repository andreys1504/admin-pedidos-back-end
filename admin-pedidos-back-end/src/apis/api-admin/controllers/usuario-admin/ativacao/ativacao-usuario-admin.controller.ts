import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { AtivacaoUsuarioAdminAppService } from "../../../../../domain/application-services/usuario-admin/ativacao/ativacao-usuario-admin.app-service";

export class AtivacaoUsuarioAdminController extends ControllerApiAdmin {
    private readonly ativacaoUsuarioAdminServicoApp = new AtivacaoUsuarioAdminAppService();

    async executar(contexto: RouteContext) {
        const idUsuario = Number(contexto.requisicao.params.id);
        const resultadoServico = await this.ativacaoUsuarioAdminServicoApp.executar({ 
            idUsuarioASerAtivado: idUsuario,
            idUsuarioRealizacaoOperacao: this.dadosTokenAutenticacaoUsuarioAdmin(contexto.requisicao).idUsuario
        });
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.ATUALIZACAO);
    }
}
