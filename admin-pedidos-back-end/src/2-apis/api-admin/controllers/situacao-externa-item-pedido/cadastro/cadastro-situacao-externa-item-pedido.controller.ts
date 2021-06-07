import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { CadastroSituacaoExternaItemPedidoViewModelController } from "./cadastro-situacao-externa-item.view-model.controller";
import { CadastroSituacaoExternaItemPedidoServicoApp } from "../../../../../0-dominio/aplicacao/servicos/situacao-externa-item-pedido/cadastro/cadastro-situacao-externa-item-pedido.servico-app";

export class CadastroSituacaoExternaItemPedidoController extends ControllerApiAdminApp {
    private readonly _cadastroSituacaoExternaItemPedidoServicoApp = new CadastroSituacaoExternaItemPedidoServicoApp();

    async executar(contexto: ContextoRota) {
        const modelServicoApp = contexto.requisicao.body as CadastroSituacaoExternaItemPedidoViewModelController;
        const resultadoServico = await this._cadastroSituacaoExternaItemPedidoServicoApp.executar(modelServicoApp);
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.CADASTRO);
    }
}