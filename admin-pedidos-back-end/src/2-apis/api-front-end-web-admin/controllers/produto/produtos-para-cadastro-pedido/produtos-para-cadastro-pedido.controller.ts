import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";
import { ProdutosParaCadastroPedidoServicoApp } from "../../../../../0-dominio/aplicacao/servicos/produto/produtos-para-cadastro-pedido/produtos-para-cadastro-pedido.servico-app";

export class ProdutosParaCadastroPedidoController extends ControllerApiAdminApp {
    private readonly _produtosParaCadastroPedidoServicoApp = new ProdutosParaCadastroPedidoServicoApp();

    async executar(contexto: ContextoRota) {
        const resultadoServico = await this._produtosParaCadastroPedidoServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.LISTAGEM);
    }
}