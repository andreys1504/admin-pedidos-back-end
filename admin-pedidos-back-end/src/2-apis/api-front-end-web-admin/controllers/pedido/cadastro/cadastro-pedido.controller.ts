import { CadastroPedidoViewModelController } from "./cadastro-pedido.view-model.controller";
import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { CadastroPedidoServicoApp } from "../../../../../0-dominio/aplicacao/servicos/pedido/cadastro/cadastro-pedido.servico-app";
import { CadastroPedidoViewModelServicoApp } from "../../../../../0-dominio/aplicacao/servicos/pedido/cadastro/cadastro-pedido.view-model.servico-app";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";

export class CadastroPedidoController extends ControllerApiAdminApp {
    private readonly _cadastroPedidoServicoApp = new CadastroPedidoServicoApp();

    async executar(contexto: ContextoRota) {
        const idUsuarioRegistroPedido = this.dadosTokenAutenticacaoUsuarioAdmin(contexto.requisicao).idUsuario;
        const modelServicoApp = (contexto.requisicao.body as CadastroPedidoViewModelController) as CadastroPedidoViewModelServicoApp;
        modelServicoApp.idUsuarioRegistroPedido = idUsuarioRegistroPedido;

        const resultadoServico = await this._cadastroPedidoServicoApp.executar(modelServicoApp);
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.CADASTRO);
    }
}