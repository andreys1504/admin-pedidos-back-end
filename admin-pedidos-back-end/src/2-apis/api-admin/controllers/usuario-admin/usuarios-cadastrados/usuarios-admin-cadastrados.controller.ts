import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { UsuariosCadastradosServicoApp } from "../../../../../0-dominio/aplicacao/servicos/usuario-admin/usuarios-cadastrados/usuarios-cadastrados.servico-app";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";

export class UsuariosAdminController extends ControllerApiAdminApp {
    private readonly _usuariosServicoApp = new UsuariosCadastradosServicoApp();

    async executar(contexto: ContextoRota) {
        const resultadoServico = await this._usuariosServicoApp.executar();
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.LISTAGEM);
    }
}