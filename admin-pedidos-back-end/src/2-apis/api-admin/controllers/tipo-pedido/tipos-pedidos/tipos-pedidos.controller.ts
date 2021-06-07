import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";
import { TiposPedidoServico } from "../../../../../0-dominio/aplicacao/servicos/tipo-pedido/tipos-pedido/tipos-pedido.servico-app";

export class TiposPedidosController extends ControllerApiAdminApp {
    private readonly _tiposPedidoServicoApp = new TiposPedidoServico();
    
    async executar(contexto: ContextoRota) {
        const tiposPedido = await this._tiposPedidoServicoApp.executar();
        this.resultadoController(contexto.resposta, tiposPedido, StatusCodeRespostas.LISTAGEM);
    }
}