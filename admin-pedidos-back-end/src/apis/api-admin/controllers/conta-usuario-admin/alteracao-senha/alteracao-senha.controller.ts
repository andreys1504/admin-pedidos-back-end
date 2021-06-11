import { AlteracaoSenhaRequestApi } from "./alteracao-senha.request-api";
import { AlteracaoSenhaRequest } from "../../../../../domain/application-services/conta-usuario-admin/alteracao-senha/alteracao-senha.request";
import { AlteracaoSenhaAppService } from "../../../../../domain/application-services/conta-usuario-admin/alteracao-senha/alteracao-senha.app-service";
import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { autenticacaoUsuarioServico } from "../../../../security/autenticacao-usuario.servico";
import { GlobalSettings } from "../../../../../core/configurations/global-settings";
import { autenticacaoUsuarioAdminServico } from "../../../../security/autenticacao-usuario-admin/autenticacao-usuario-admin.servico";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";

export class AlteracaoSenhaController extends ControllerApiAdmin {
    private readonly alteracaoSenhaServicoApp = new AlteracaoSenhaAppService();

    async executar(contexto: RouteContext) {
        const dadosAlteracaoSenha = contexto.requisicao.body as AlteracaoSenhaRequestApi;

        const tokenDecodificado = autenticacaoUsuarioAdminServico
            .decodificarToken(
                autenticacaoUsuarioServico.recuperarTokenRequisicao(contexto.requisicao),
                GlobalSettings.APIS_SALT_KEY);

        const dadosServicoApp = dadosAlteracaoSenha as AlteracaoSenhaRequest;
        dadosServicoApp.nomeUsuario = tokenDecodificado.nomeUsuario;

        const resultadoServico = await this.alteracaoSenhaServicoApp.executar(dadosServicoApp);
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.ATUALIZACAO);
    }
}