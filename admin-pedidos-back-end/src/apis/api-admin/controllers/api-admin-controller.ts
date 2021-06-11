import { Request } from 'express';
import { GlobalSettings } from '../../../core/configurations/global-settings';
import { ResponseAppService } from '../../../core/domain/application-services/response/response-app-service';
import { ResponseApiStatusCode } from '../configurations/response-api-status-code';
import { tokenService } from '../configurations/routes/security/token-service';
import { RouteContext } from '../configurations/routes/route-context';
import { TokenPayload } from '../configurations/routes/security/token-payload';

export abstract class ApiAdminController {
    authenticatedUser = (request: Request) : TokenPayload => {
        return tokenService
            .decodeToken(tokenService.getToken(request), GlobalSettings.APIS_SALT_KEY);
    }

    result<TResultadoServico>( 
        routeContext: RouteContext, 
        responseAppService: ResponseAppService<TResultadoServico>,
        statusCode: ResponseApiStatusCode 
    ) {
        if (!responseAppService.success) {
            statusCode = ResponseApiStatusCode.SUCESSO;
        }

        routeContext.response.status(+statusCode).send(responseAppService);
    }
}
