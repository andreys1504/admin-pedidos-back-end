import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { CadastroTipoPedidoViewModelController } from "./cadastro-tipo-pedido.view-model.controller";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";
import { CadastroTipoPedidoServicoApp } from "../../../../../0-dominio/aplicacao/servicos/tipo-pedido/cadastro/cadastro-tipo-pedido.servico-app";

export class CadastroTipoPedidoController extends ControllerApiAdminApp {
    private readonly _cadastroTipoPedidoServicoApp = new CadastroTipoPedidoServicoApp();

    async executar(contexto: ContextoRota) {
        const modelServicoApp = contexto.requisicao.body as CadastroTipoPedidoViewModelController;
        const resultadoServico = await this._cadastroTipoPedidoServicoApp.executar(modelServicoApp);
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.CADASTRO);
    }
}