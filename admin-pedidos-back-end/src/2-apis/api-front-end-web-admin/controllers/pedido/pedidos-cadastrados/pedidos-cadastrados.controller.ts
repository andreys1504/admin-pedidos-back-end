import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";
import { PedidosCadastradosServicoApp } from "../../../../../0-dominio/aplicacao/servicos/pedido/pedidos-cadastrados/pedidos-cadastrados.servico-app";

export class PedidosCadastradosController extends ControllerApiAdminApp {
    private readonly _pedidosServicoApp = new PedidosCadastradosServicoApp();

    async executar(contexto: ContextoRota) {
        const resultadoServico = await this._pedidosServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.LISTAGEM);
    }
}