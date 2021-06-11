import { CadastroPedidoRequestApi } from "./cadastro-pedido.request-api";
import { CadastroPedidoAppService } from "../../../../../domain/application-services/pedido/cadastro/cadastro-pedido.app-service";
import { CadastroPedidoRequest } from "../../../../../domain/application-services/pedido/cadastro/cadastro-pedido.request";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";

export class CadastroPedidoController extends ControllerApiAdmin {
    private readonly cadastroPedidoServicoApp = new CadastroPedidoAppService();

    async executar(contexto: RouteContext) {
        const idUsuarioRegistroPedido = this.dadosTokenAutenticacaoUsuarioAdmin(contexto.requisicao).idUsuario;
        const modelServicoApp = (contexto.requisicao.body as CadastroPedidoRequestApi) as CadastroPedidoRequest;
        modelServicoApp.idUsuarioRegistroPedido = idUsuarioRegistroPedido;

        const resultadoServico = await this.cadastroPedidoServicoApp.executar(modelServicoApp);
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.CADASTRO);
    }
}
