import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { DesativacaoUsuarioAdminServicoApp } from "../../../../../0-dominio/aplicacao/servicos/usuario-admin/desativacao/desativacao-usuario-admin.servico-app";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";

export class DesativacaoUsuarioAdminController extends ControllerApiAdminApp {
    private readonly _desativacaoUsuarioAdminServicoApp = new DesativacaoUsuarioAdminServicoApp();

    async executar(contexto: ContextoRota) {
        const idUsuario = Number(contexto.requisicao.params.id);

        const resultadoServico = await this._desativacaoUsuarioAdminServicoApp.executar({
            idUsuarioASerDesativado: idUsuario,
            idUsuarioRealizacaoOperacao: this.dadosTokenAutenticacaoUsuarioAdmin(contexto.requisicao).idUsuario
        });
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.ATUALIZACAO);
    }
}