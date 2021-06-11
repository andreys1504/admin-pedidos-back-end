import { CadastroUsuarioAdminRequestApi } from "./cadastro-usuario-admin.request-api";
import { CadastroUsuarioAdminAppService } from "../../../../../domain/application-services/usuario-admin/cadastro/cadastro-usuario-admin.app-service";
import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";

export class CadastroUsuarioAdminController extends ControllerApiAdmin {
    private readonly cadastroUsuarioAdminServicoApp = new CadastroUsuarioAdminAppService();

    async executar(contexto: RouteContext) {
        const dadosCadastro = contexto.requisicao.body as CadastroUsuarioAdminRequestApi;
        const resultadoServico = await this.cadastroUsuarioAdminServicoApp.executar(dadosCadastro);
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.CADASTRO);
    }
}
