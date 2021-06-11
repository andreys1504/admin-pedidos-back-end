import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";

export class ValidacaoTokenController extends ApiAdminController {
    handle(routeContext: RouteContext) {
        routeContext.response.status(+ResponseApiStatusCode.SUCESSO).send({ mensagem: 'Token Válido' });
    }
}
