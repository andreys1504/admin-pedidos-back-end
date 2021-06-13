import { ApiAdminController } from '../../api-admin-controller';
import { ResponseApiStatusCode } from '../../../configurations/response-api-status-code';
import { RouteContext } from '../../../configurations/routes/route-context';
import { TiposProdutosCadastradosAppService } from '../../../../../domain/application-services/tipo-produto/tipos-produtos-cadastrados/tipos-produtos-cadastrados.app-service';

export class TiposProdutoCadastradosController extends ApiAdminController {
    private readonly appService = new TiposProdutosCadastradosAppService();

    async handleAsync(routeContext: RouteContext) {
        const responseAppService = await this.appService.handleAsync();
        this.result(routeContext, responseAppService, ResponseApiStatusCode.LISTAGEM);
    }
}
