import { PedidosParaTratamentoRequestApi } from "./pedidos-para-tratamento.request-api";
import { PedidosParaTratamentoAppService } from "../../../../../domain/application-services/pedido/pedidos-para-tratamento/pedidos-para-tratamento.app-service";
import { PedidosParaTratamentoRequest } from "../../../../../domain/application-services/pedido/pedidos-para-tratamento/pedidos-para-tratamento.request";
import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { recuperarValorBoleanoRequisicao } from "../../../../../core/helpers";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";

export class PedidosParaTratamentoController extends ControllerApiAdmin {
    private readonly pedidosParaTratamentoServicoApp = new PedidosParaTratamentoAppService();

    async executar(contexto: RouteContext) {
        const dadosPesquisa = contexto.requisicao.query as unknown as PedidosParaTratamentoRequestApi;
        dadosPesquisa.pedidosPendentes = recuperarValorBoleanoRequisicao(contexto.requisicao.query.pedidosPendentes as string);
        dadosPesquisa.pedidoRealizadoLojaVirtual = recuperarValorBoleanoRequisicao(contexto.requisicao.query.pedidoRealizadoLojaVirtual as string) || false;

        const modelServicoApp = dadosPesquisa as PedidosParaTratamentoRequest;
        const resultadoServico = await this.pedidosParaTratamentoServicoApp.executar(modelServicoApp);
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.LISTAGEM);
    }
}
