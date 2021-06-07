import { AutenticacaoViewModelController } from "./autenticacao.view-model.controller";
import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { AutenticacaoViewModelServicoApp } from "../../../../../0-dominio/aplicacao/servicos/conta-usuario-admin/autenticacao/autenticacao.view-model.servico-app";
import { AutenticacaoServicoApp } from "../../../../../0-dominio/aplicacao/servicos/conta-usuario-admin/autenticacao/autenticacao.servico-app";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";

export class AutenticacaoController extends ControllerApiAdminApp {
    private readonly _autenticacaoServicoApp = new AutenticacaoServicoApp();

    async executar(contexto: ContextoRota) {
        const dadosAutenticacao = contexto.requisicao.body as AutenticacaoViewModelController;
        const dadosServicoApp = dadosAutenticacao as AutenticacaoViewModelServicoApp;

        const resultadoServico = await this._autenticacaoServicoApp.executar(dadosServicoApp);
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.SUCESSO);
    }
}