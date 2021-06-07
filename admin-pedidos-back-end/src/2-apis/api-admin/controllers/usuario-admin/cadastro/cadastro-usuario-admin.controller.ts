import { CadastroUsuarioAdminViewModelController } from "./cadastro-usuario-admin.view-model.controller";
import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";
import { CadastroUsuarioAdminServicoApp } from "../../../../../0-dominio/aplicacao/servicos/usuario-admin/cadastro/cadastro-usuario-admin.servico-app";

export class CadastroUsuarioAdminController extends ControllerApiAdminApp {
    private readonly _cadastroUsuarioAdminServicoApp = new CadastroUsuarioAdminServicoApp();

    async executar(contexto: ContextoRota) {
        const dadosCadastro = contexto.requisicao.body as CadastroUsuarioAdminViewModelController;
        const resultadoServico = await this._cadastroUsuarioAdminServicoApp.executar(dadosCadastro);
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.CADASTRO);
    }
}