import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { ClientesParaEdicaoDadosAppService } from "../../../../../domain/application-services/cliente/clientes-para-edicao-dados/clientes-para-edicao-dados.app-service";

export class ClientesParaEdicaoDadosController extends ControllerApiAdmin {
    private readonly clientesParaEdicaoDadosServicoApp = new ClientesParaEdicaoDadosAppService();

    async executar(contexto: RouteContext) {
        const nomeCpfCnpj = contexto.requisicao.params.nomeCpfCnpj;
        const resultadoServico = await this.clientesParaEdicaoDadosServicoApp.executar({ nomeCpfCnpj });
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.LISTAGEM);
    }
}
