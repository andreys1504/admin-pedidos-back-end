import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { TiposProdutosCadastradosServicoApp } from "../../../../../0-dominio/aplicacao/servicos/tipo-produto/tipos-produtos-cadastrados/tipos-produtos-cadastrados.servico-app";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";

export class TiposProdutoCadastradosController extends ControllerApiAdminApp {
    private readonly _tiposProdutosCadastradosServicoApp = new TiposProdutosCadastradosServicoApp();

    async executar(contexto: ContextoRota) {
        const resultadoServico = await this._tiposProdutosCadastradosServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.LISTAGEM);
    }
}