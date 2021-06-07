import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { ClientesParaEdicaoDadosServicoApp } from "../../../../../0-dominio/aplicacao/servicos/cliente/clientes-para-edicao-dados/clientes-para-edicao-dados.servico-app";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";

export class ClientesParaEdicaoDadosController extends ControllerApiAdminApp {
    private readonly _clientesParaEdicaoDadosServicoApp = new ClientesParaEdicaoDadosServicoApp();

    async executar(contexto: ContextoRota) {
        const nomeCpfCnpj = contexto.requisicao.params.nomeCpfCnpj;
        const resultadoServico = await this._clientesParaEdicaoDadosServicoApp.executar({ nomeCpfCnpj });
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.LISTAGEM);
    }
}