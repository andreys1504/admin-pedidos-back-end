import { CadastroSituacaoInternaItemRequestApi } from './cadastro-situacao-interna-item.request-api';
import { CadastroSituacaoInternaItemPedidoAppService } from '../../../../../domain/application-services/situacao-interna-item-pedido/cadastro/cadastro-situacao-interna-item-pedido.app-service';
import { ApiAdminController } from '../../api-admin-controller';
import { RouteContext } from '../../../configurations/routes/route-context';
import { ResponseApiStatusCode } from '../../../configurations/response-api-status-code';
import { CadastroSituacaoInternaItemPedidoRequest } from '../../../../../domain/application-services/situacao-interna-item-pedido/cadastro/cadastro-situacao-interna-item-pedido.request';

export class CadastroSituacaoInternaItemPedidoController extends ApiAdminController {
    private readonly appService = new CadastroSituacaoInternaItemPedidoAppService();

    async handleAsync(routeContext: RouteContext) {
        const requestApi = routeContext.request.body as CadastroSituacaoInternaItemRequestApi;
        const requestAppService = new CadastroSituacaoInternaItemPedidoRequest({
            id: requestApi.id,
            descricao: requestApi.descricao,
            ativo: requestApi.ativo
          });
        const responseAppService = await this.appService.handleAsync(requestAppService);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.CADASTRO);
    }
}
