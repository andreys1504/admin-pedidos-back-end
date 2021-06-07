import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { CadastroSituacaoInternaItemViewModelController } from "./cadastro-situacao-interna-item.view-model.controller";
import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { CadastroSituacaoInternaItemPedidoServicoApp } from "../../../../../0-dominio/aplicacao/servicos/situacao-interna-item-pedido/cadastro/cadastro-situacao-interna-item-pedido.servico-app";

export class CadastroSituacaoInternaItemPedidoController extends ControllerApiAdminApp {
    private readonly _cadatroSituacaoInternaItemPedidoServicoApp = new CadastroSituacaoInternaItemPedidoServicoApp();

    async executar(contexto: ContextoRota) {
        const modelServicoApp = contexto.requisicao.body as CadastroSituacaoInternaItemViewModelController;
        const resultadoServico = await this._cadatroSituacaoInternaItemPedidoServicoApp.executar(modelServicoApp);
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.CADASTRO);
    }
}