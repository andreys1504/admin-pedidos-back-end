import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { ClienteParaCadastroPedidoServicoApp } from "../../../../../0-dominio/aplicacao/servicos/cliente/clientes-para-cadastro-pedido/clientes-para-cadastro-pedido.servico-app";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";

export class ClientesParaCadastroPedidoController extends ControllerApiAdminApp {
    private readonly _clienteParaCadastroPedidoServicoApp = new ClienteParaCadastroPedidoServicoApp();

    async executar(contexto: ContextoRota) {
        const nomeCpfCnpj = contexto.requisicao.params.nomeCpfCnpj;

        const resultadoServico = await this._clienteParaCadastroPedidoServicoApp.executar({ nomeCpfCnpj });
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.LISTAGEM);
    }
}