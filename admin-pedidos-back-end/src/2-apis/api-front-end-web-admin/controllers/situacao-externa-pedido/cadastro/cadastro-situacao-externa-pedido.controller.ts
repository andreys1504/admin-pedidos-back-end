import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app"
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { CadastroSituacaoExternaPedidoViewModelController } from "./cadastro-situacao-externa-pedido.view-model.controller";
import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { CadastroSituacaoExternaPedidoServicoApp } from "../../../../../0-dominio/aplicacao/servicos/situacao-externa-pedido/cadastro/cadastro-situacao-externa-pedido.servico-app";

export class CadastroSituacaoExternaPedidoController extends ControllerApiAdminApp {
    private readonly _cadastroSituacaoExternaPedidoServicoApp = new CadastroSituacaoExternaPedidoServicoApp();

    async executar(contexto: ContextoRota) {
        const modelServicoApp = contexto.requisicao.body as CadastroSituacaoExternaPedidoViewModelController;
        const resultadoServico = await this._cadastroSituacaoExternaPedidoServicoApp.executar(modelServicoApp);
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.CADASTRO);
    }
}