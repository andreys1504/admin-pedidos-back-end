import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { AtivacaoUsuarioAdminServicoApp } from "../../../../../0-dominio/aplicacao/servicos/usuario-admin/ativacao/ativacao-usuario-admin.servico-app";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";

export class AtivacaoUsuarioAdminController extends ControllerApiAdminApp {
    private readonly _ativacaoUsuarioAdminServicoApp = new AtivacaoUsuarioAdminServicoApp();

    async executar(contexto: ContextoRota) {
        const idUsuario = Number(contexto.requisicao.params.id);
        const resultadoServico = await this._ativacaoUsuarioAdminServicoApp.executar({ 
            idUsuarioASerAtivado: idUsuario,
            idUsuarioRealizacaoOperacao: this.dadosTokenAutenticacaoUsuarioAdmin(contexto.requisicao).idUsuario
        });
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.ATUALIZACAO);
    }
}