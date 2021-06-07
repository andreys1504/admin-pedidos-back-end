import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { AlteracaoSenhaViewModelController } from "./alteracao-senha.view-model.controller";
import { autenticacaoUsuarioAdminServico } from '../../../../../1-infra/servicos/autenticacao-usuario/autenticacao-usuario-admin/autenticacao-usuario-admin.servico';
import { autenticacaoUsuarioServico } from '../../../../../1-infra/servicos/autenticacao-usuario/autenticacao-usuario.servico';
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { ConfiguracoesGlobaisApp } from "../../../../../0-core/configuracoes-aplicacoes/configuracoes-globais.app";
import { AlteracaoSenhaViewModelServicoApp } from "../../../../../0-dominio/aplicacao/servicos/conta-usuario-admin/alteracao-senha/alteracao-senha.view-model.servico-app";
import { AlteracaoSenhaServicoApp } from "../../../../../0-dominio/aplicacao/servicos/conta-usuario-admin/alteracao-senha/alteracao-senha.servico-app";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";

export class AlteracaoSenhaController extends ControllerApiAdminApp {
    private readonly _alteracaoSenhaServicoApp = new AlteracaoSenhaServicoApp();

    async executar(contexto: ContextoRota) {
        const dadosAlteracaoSenha = contexto.requisicao.body as AlteracaoSenhaViewModelController;

        const tokenDecodificado = autenticacaoUsuarioAdminServico
            .decodificarToken(
                autenticacaoUsuarioServico.recuperarTokenRequisicao(contexto.requisicao),
                ConfiguracoesGlobaisApp.APIS_SALT_KEY);

        const dadosServicoApp = dadosAlteracaoSenha as AlteracaoSenhaViewModelServicoApp;
        dadosServicoApp.nomeUsuario = tokenDecodificado.nomeUsuario;

        const resultadoServico = await this._alteracaoSenhaServicoApp.executar(dadosServicoApp);
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.ATUALIZACAO);
    }
}