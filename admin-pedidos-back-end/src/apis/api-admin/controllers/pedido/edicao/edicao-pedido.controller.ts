import { EdicaoPedidoRequestApi } from "./edicao-pedido.request-api";
import { EdicaoPedidoAppService } from "../../../../../domain/application-services/pedido/edicao/edicao-pedido.app-service";
import { EdicaoPedidoRequest } from "../../../../../domain/application-services/pedido/edicao/edicao-pedido.request";
import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";

export class EdicaoPedidoController extends ControllerApiAdmin {
    private readonly edicaoPedidoServicoApp = new EdicaoPedidoAppService();

    async executar(contexto: RouteContext) {
        const modelServicoApp = (contexto.requisicao.body as EdicaoPedidoRequestApi) as EdicaoPedidoRequest;
        const resultadoServico = await this.edicaoPedidoServicoApp.executar(modelServicoApp);
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.ATUALIZACAO);
    }
}
