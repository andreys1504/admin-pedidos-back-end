import { PedidosParaTratamentoViewModelController } from "./pedidos-para-tratamento.view-model.controller";
import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { recuperarValorBoleanoRequisicao } from "../../../../../0-core/helpers";
import { PedidosParaTratamentoServicoApp } from "../../../../../0-dominio/aplicacao/servicos/pedido/pedidos-para-tratamento/pedidos-para-tratamento.servico-app";
import { PedidosParaTratamentoViewModelServicoApp } from "../../../../../0-dominio/aplicacao/servicos/pedido/pedidos-para-tratamento/pedidos-para-tratamento.view-model.servico-app";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";

export class PedidosParaTratamentoController extends ControllerApiAdminApp {
    private readonly _pedidosParaTratamentoServicoApp = new PedidosParaTratamentoServicoApp();

    async executar(contexto: ContextoRota) {
        const dadosPesquisa = contexto.requisicao.query as unknown as PedidosParaTratamentoViewModelController;
        dadosPesquisa.pedidosPendentes = recuperarValorBoleanoRequisicao(contexto.requisicao.query.pedidosPendentes as string);
        dadosPesquisa.pedidoRealizadoLojaVirtual = recuperarValorBoleanoRequisicao(contexto.requisicao.query.pedidoRealizadoLojaVirtual as string) || false;

        const modelServicoApp = dadosPesquisa as PedidosParaTratamentoViewModelServicoApp;
        const resultadoServico = await this._pedidosParaTratamentoServicoApp.executar(modelServicoApp);
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.LISTAGEM);
    }
}