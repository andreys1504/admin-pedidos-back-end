import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";
import { TiposProdutosAtivosServicoApp } from "../../../../../0-dominio/aplicacao/servicos/tipo-produto/tipos-produtos-ativos/tipos-produtos-ativos.servico-app";

export class TiposProdutoAtivosController extends ControllerApiAdminApp {
    private readonly _tiposProdutosAtivosServicoApp = new TiposProdutosAtivosServicoApp();

    async executar(contexto: ContextoRota) {
        const resultadoServico = await this._tiposProdutosAtivosServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.LISTAGEM);
    }
}