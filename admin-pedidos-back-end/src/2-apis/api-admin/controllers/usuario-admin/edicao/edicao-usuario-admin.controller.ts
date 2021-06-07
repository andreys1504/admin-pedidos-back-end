import { EdicaoUsuarioViewModelController } from "./edicao-usuario.view-model.controller";
import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { EdicaoUsuarioAdminServicoApp } from "../../../../../0-dominio/aplicacao/servicos/usuario-admin/edicao/edicao-usuario-admin.servico-app";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";

export class EdicaoUsuarioAdminController extends ControllerApiAdminApp {
    private readonly _edicaoUsuarioAdminServicoApp = new EdicaoUsuarioAdminServicoApp();

    async executar(contexto: ContextoRota) {
        const dadosEdicao = contexto.requisicao.body as EdicaoUsuarioViewModelController;
        const resultadoServico = await this._edicaoUsuarioAdminServicoApp.executar(dadosEdicao);
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.ATUALIZACAO);
    }
}