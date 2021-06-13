import { CadastroTipoPedidoRequestApi } from './cadastro-tipo-pedido.request-api';
import { CadastroTipoPedidoAppService } from '../../../../../domain/application-services/tipo-pedido/cadastro/cadastro-tipo-pedido.app-service';
import { ApiAdminController } from '../../api-admin-controller';
import { RouteContext } from '../../../configurations/routes/route-context';
import { ResponseApiStatusCode } from '../../../configurations/response-api-status-code';
import { CadastroTipoPedidoRequest } from '../../../../../domain/application-services/tipo-pedido/cadastro/cadastro-tipo-pedido.request';

export class CadastroTipoPedidoController extends ApiAdminController {
    private readonly appService = new CadastroTipoPedidoAppService();

    async handleAsync(routeContext: RouteContext) {
        const requestApi = routeContext.request.body as CadastroTipoPedidoRequestApi;
        const requestAppService = new CadastroTipoPedidoRequest({
            ...requestApi
        });
        const responseAppService = await this.appService.handleAsync(requestAppService);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.CADASTRO);
    }
}
