import { CadastroUsuarioAdminRequestApi } from './cadastro-usuario-admin.request-api';
import { CadastroUsuarioAdminAppService } from '../../../../../domain/application-services/usuario-admin/cadastro/cadastro-usuario-admin.app-service';
import { ApiAdminController } from '../../api-admin-controller';
import { RouteContext } from '../../../configurations/routes/route-context';
import { ResponseApiStatusCode } from '../../../configurations/response-api-status-code';
import { CadastroUsuarioAdminRequest } from '../../../../../domain/application-services/usuario-admin/cadastro/cadastro-usuario-admin.request';

export class CadastroUsuarioAdminController extends ApiAdminController {
    private readonly appService = new CadastroUsuarioAdminAppService();

    async handleAsync(routeContext: RouteContext) {
        const requestApi = routeContext.request.body as CadastroUsuarioAdminRequestApi;
        const requestAppService = new CadastroUsuarioAdminRequest({
            nomeUsuario: requestApi.nomeUsuario,
            senha: requestApi.senha,
            nome: requestApi.nome,
            permissoes: requestApi.permissoes
        });
        const responseAppService = await this.appService.handleAsync(requestAppService);
        this.result(routeContext, responseAppService, ResponseApiStatusCode.CADASTRO);
    }
}
