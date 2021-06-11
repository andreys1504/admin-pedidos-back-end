import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";

export class ValidacaoTokenController extends ControllerApiAdmin {
    executar(contexto: RouteContext) {
        this.configRespostaSucesso(contexto.resposta, { mensagem: 'Token Válido' }, ResponseApiStatusCode.SUCESSO);
    }
}
