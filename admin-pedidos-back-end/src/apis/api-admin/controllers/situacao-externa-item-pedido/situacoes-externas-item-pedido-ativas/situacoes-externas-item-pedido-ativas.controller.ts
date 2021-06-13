import { ApiAdminController } from '../../api-admin-controller';
import { ResponseApiStatusCode } from '../../../configurations/response-api-status-code';
import { RouteContext } from '../../../configurations/routes/route-context';
import { SituacoesExternasItemPedidoAtivasAppService } from '../../../../../domain/application-services/situacao-externa-item-pedido/situacoes-externas-item-pedido-ativas/situacoes-externas-item-pedido-ativas.app-service';

export class SituacoesExternasItemPedidoAtivasController extends ApiAdminController {
    private readonly appService = new SituacoesExternasItemPedidoAtivasAppService();

    async handleAsync(routeContext: RouteContext) {
        const responseAppService = await this.appService.handleAsync();
        this.result(routeContext, responseAppService, ResponseApiStatusCode.LISTAGEM);
    }
}
