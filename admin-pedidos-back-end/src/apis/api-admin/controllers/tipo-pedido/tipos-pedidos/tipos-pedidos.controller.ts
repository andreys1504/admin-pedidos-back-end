import { ApiAdminController } from '../../api-admin-controller';
import { ResponseApiStatusCode } from '../../../configurations/response-api-status-code';
import { RouteContext } from '../../../configurations/routes/route-context';
import { TiposPedidoAppService } from '../../../../../domain/application-services/tipo-pedido/tipos-pedido/tipos-pedido.app-service';

export class TiposPedidosController extends ApiAdminController {
    private readonly appService = new TiposPedidoAppService();
    
    async handleAsync(routeContext: RouteContext) {
        const responseAppService = await this.appService.handleAsync();
        this.result(routeContext, responseAppService, ResponseApiStatusCode.LISTAGEM);
    }
}
