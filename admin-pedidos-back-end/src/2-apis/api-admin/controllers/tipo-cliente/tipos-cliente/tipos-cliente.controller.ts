import { TiposClienteServicoApp } from "../../../../../0-dominio/aplicacao/servicos/tipo-cliente/tipos-cliente/tipos-cliente-cadastrados.servico-app";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";

export class TiposClienteController extends ControllerApiAdminApp {
    private readonly _tiposClienteCadastradosServicoApp = new TiposClienteServicoApp();

    async executar(contexto: ContextoRota) {
        const resultadoServico = await this._tiposClienteCadastradosServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.LISTAGEM);
    }
}