import { CadastroClienteRequestApi } from "./cadastro-cliente.request-api";
import { CadastroClienteAppService } from "../../../../../domain/application-services/cliente/cadastro/cadastro-cliente.app-service";
import { CadastroClienteRequest } from "../../../../../domain/application-services/cliente/cadastro/cadastro-cliente.request";
import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";

export class CadastroClienteController extends ControllerApiAdmin {
    private readonly cadastroClienteServicoApp = new CadastroClienteAppService();

    async executar(contexto: RouteContext) {
        const dadosCadastro = contexto.requisicao.body as CadastroClienteRequestApi;
        const dadosCadastroServicoApp = dadosCadastro as CadastroClienteRequest;
        const resultadoServico = await this.cadastroClienteServicoApp.executar(dadosCadastroServicoApp);

        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.CADASTRO);
    }
}