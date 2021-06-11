import { EdicaoClienteRequestApi } from "./edicao-cliente.request-api";
import { EdicaoClienteAppService } from "../../../../../domain/application-services/cliente/edicao/edicao-cliente.app-service";
import { EdicaoViewModelAppService } from "../../../../../domain/application-services/cliente/edicao/edicao-cliente.request";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";

export class EdicaoClienteController extends ControllerApiAdmin {
    private readonly edicaoServicoApp = new EdicaoClienteAppService();

    async executar(contexto: RouteContext) {
        const idCliente = contexto.requisicao.params.id;
        const requisicao = (contexto.requisicao.body as EdicaoClienteRequestApi) as EdicaoViewModelAppService;
        requisicao.idCliente = +idCliente;

        const resultadoServico = await this.edicaoServicoApp.executar(requisicao);
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.ATUALIZACAO);
    }
}
