import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app"
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { TiposClienteAtivosServicoApp } from "../../../../../0-dominio/aplicacao/servicos/tipo-cliente/tipos-cliente-ativos/tipos-cliente-ativos.servico-app";
import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";

export class TiposClienteAtivosController extends ControllerApiAdminApp {
    private readonly _tiposClienteAtivosServicoApp = new TiposClienteAtivosServicoApp();

    async executar(contexto: ContextoRota) {
        const resultadoServico = await this._tiposClienteAtivosServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.LISTAGEM);
    }
}