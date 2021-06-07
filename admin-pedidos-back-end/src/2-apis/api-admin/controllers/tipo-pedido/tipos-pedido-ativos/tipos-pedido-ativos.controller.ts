import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";
import { TiposPedidoAtivosServico } from "../../../../../0-dominio/aplicacao/servicos/tipo-pedido/tipos-pedido-ativos/tipos-pedido-ativos.servico-app";

export class TiposPedidoAtivosController extends ControllerApiAdminApp {
    private readonly _tiposPedidoAtivosServico = new TiposPedidoAtivosServico();

    async executar(contexto: ContextoRota) {
        const resultadoServico = await this._tiposPedidoAtivosServico.executar();
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.LISTAGEM);
    }
}