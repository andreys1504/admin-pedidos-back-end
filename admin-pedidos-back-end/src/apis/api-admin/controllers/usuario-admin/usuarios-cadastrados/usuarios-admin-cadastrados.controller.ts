import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { UsuariosCadastradosAppService } from "../../../../../domain/application-services/usuario-admin/usuarios-cadastrados/usuarios-cadastrados.app-service";

export class UsuariosAdminController extends ControllerApiAdmin {
    private readonly usuariosServicoApp = new UsuariosCadastradosAppService();

    async executar(contexto: RouteContext) {
        const resultadoServico = await this.usuariosServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.LISTAGEM);
    }
}
