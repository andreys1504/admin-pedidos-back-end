import { CadastroTipoPagamentoPedidoViewModelController } from "./cadastro-tipo-pagamento-pedido.view-model.controller";
import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";
import { CadastroTipoPagamentoPedidoServicoApp } from "../../../../../0-dominio/aplicacao/servicos/tipo-pagamento-pedido/cadastro-tipo-pagamento-pedido/cadastro-tipo-pagamento-pedido.servico-app";

export class CadastroTipoPagamentoPedidoController extends ControllerApiAdminApp {
    private readonly _cadastroTipoPagamentoPedidoServicoApp = new CadastroTipoPagamentoPedidoServicoApp();

    async executar(contexto: ContextoRota) {
        const modelServicoApp = contexto.requisicao.body as CadastroTipoPagamentoPedidoViewModelController;
        const resultadoServico = await this._cadastroTipoPagamentoPedidoServicoApp.executar(modelServicoApp);
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.CADASTRO);
    }
}