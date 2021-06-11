import { EdicaoUsuarioRequestApi } from "./edicao-usuario.request-api";
import { EdicaoUsuarioAdminAppService } from "../../../../../domain/application-services/usuario-admin/edicao/edicao-usuario-admin.app-service";
import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";

export class EdicaoUsuarioAdminController extends ControllerApiAdmin {
    private readonly _edicaoUsuarioAdminServicoApp = new EdicaoUsuarioAdminAppService();

    async executar(contexto: RouteContext) {
        const dadosEdicao = contexto.requisicao.body as EdicaoUsuarioRequestApi;
        const resultadoServico = await this._edicaoUsuarioAdminServicoApp.executar(dadosEdicao);
        this.resultadoController(contexto.resposta, resultadoServico, ResponseApiStatusCode.ATUALIZACAO);
    }
}
