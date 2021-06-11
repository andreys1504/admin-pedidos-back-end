import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { ClienteParaCadastroAppService } from "../../../../../domain/application-services/cliente/clientes-para-cadastro-pedido/clientes-para-cadastro-pedido.app-service";

export class ClientesParaCadastroPedidoController extends ControllerApiAdmin {
    private readonly clienteParaCadastroPedidoServicoApp = new ClienteParaCadastroAppService();

    async executar(contexto: RouteContext) {
        const nomeCpfCnpj = contexto.requisicao.params.nomeCpfCnpj;

        const resultadoServico = await this.clienteParaCadastroPedidoServicoApp.executar({ nomeCpfCnpj });
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.LISTAGEM);
    }
}
