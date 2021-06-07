import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";

export class ValidacaoTokenController extends ControllerApiAdminApp {
    executar(contexto: ContextoRota) {
        this.configRespostaSucesso(contexto.resposta, { mensagem: 'Token Válido' }, StatusCodeRespostas.SUCESSO);
    }
}