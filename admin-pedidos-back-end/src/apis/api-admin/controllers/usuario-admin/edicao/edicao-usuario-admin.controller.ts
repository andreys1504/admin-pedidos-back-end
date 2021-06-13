import { EdicaoUsuarioRequestApi } from './edicao-usuario.request-api';
import { EdicaoUsuarioAdminAppService } from '../../../../../domain/application-services/usuario-admin/edicao/edicao-usuario-admin.app-service';
import { ApiAdminController } from '../../api-admin-controller';
import { RouteContext } from '../../../configurations/routes/route-context';
import { ResponseApiStatusCode } from '../../../configurations/response-api-status-code';
import { EdicaoUsuarioAdminRequest } from '../../../../../domain/application-services/usuario-admin/edicao/edicao-usuario-admin.request';

export class EdicaoUsuarioAdminController extends ApiAdminController {
    private readonly appService = new EdicaoUsuarioAdminAppService();

    async handleAsync(routeContext: RouteContext) {
        const requestApi = routeContext.request.body as EdicaoUsuarioRequestApi;
        const requestAppService = new EdicaoUsuarioAdminRequest({
            senhaEditada: requestApi.senhaEditada,
            usuario: requestApi.usuario
        });
        const responseAppService = await this.appService.handleAsync(requestAppService);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.ATUALIZACAO);
    }
}
