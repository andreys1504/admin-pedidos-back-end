import { EdicaoPedidoViewModelController } from "./edicao-pedido.view-model.controller";
import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { EdicaoPedidoServicoApp } from "../../../../../0-dominio/aplicacao/servicos/pedido/edicao/edicao-pedido.servico-app";
import { EdicaoPedidoViewModelServicoApp } from "../../../../../0-dominio/aplicacao/servicos/pedido/edicao/edicao-pedido.view-model.servico-app";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";

export class EdicaoPedidoController extends ControllerApiAdminApp {
    private readonly _edicaoPedidoServicoApp = new EdicaoPedidoServicoApp();

    async executar(contexto: ContextoRota) {
        const modelServicoApp = (contexto.requisicao.body as EdicaoPedidoViewModelController) as EdicaoPedidoViewModelServicoApp;
        const resultadoServico = await this._edicaoPedidoServicoApp.executar(modelServicoApp);
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.ATUALIZACAO);
    }
}