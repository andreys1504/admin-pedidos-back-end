import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { CadastroTipoClienteAppService } from "../../../../../domain/application-services/tipo-cliente/cadastro/cadastro-tipo-cliente.app-service";
import { TipoClienteRepository } from "../../../../../infra/data/repositories/tipo-cliente.repository";
import { CadastroTipoClienteRequestApi } from "./cadastro-tipo-cliente.request-api";
import { CadastroTipoClienteRequest } from "../../../../../domain/application-services/tipo-cliente/cadastro/cadastro-tipo-cliente.request";

export class CadastroTipoClienteController extends ApiAdminController {
  private readonly appService = new CadastroTipoClienteAppService(
    new TipoClienteRepository()
  );

  async handleAsync(routeContext: RouteContext) {
    const requestApi = 
      routeContext.request.body as CadastroTipoClienteRequestApi;
    const requestAppService = new CadastroTipoClienteRequest({
      id: requestApi.id,
      descricao: requestApi.descricao,
      ativo: requestApi.ativo
    });
    const responseAppService = await this.appService.handleAsync(requestAppService);
    this.result(
      routeContext,
      responseAppService,
      ResponseApiStatusCode.CADASTRO
    );
  }
}
