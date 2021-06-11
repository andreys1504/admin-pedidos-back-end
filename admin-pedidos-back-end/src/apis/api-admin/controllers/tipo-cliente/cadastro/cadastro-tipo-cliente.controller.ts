import { ApiAdminController } from "../../api-admin-controller";
import { ResponseApiStatusCode } from "../../../configurations/response-api-status-code";
import { RouteContext } from "../../../configurations/routes/route-context";
import { ValidacaoDados } from "../../../../../core/helpers";
import { CadastroTipoClienteAppService } from "../../../../../domain/application-services/tipo-cliente/cadastro/cadastro-tipo-cliente.app-service";
import { TipoClienteRepository } from "../../../../../infra/data/repositories/tipo-cliente.repository";
import { CadastroTipoClienteRequestApi } from "./cadastro-tipo-cliente.request-api";

export class CadastroTipoClienteController extends ApiAdminController {
  private readonly appService = new CadastroTipoClienteAppService(
    new ValidacaoDados(),
    new TipoClienteRepository()
  );

  async handle(routeContext: RouteContext) {
    const requestApi = routeContext.request
      .body as CadastroTipoClienteRequestApi;
    const responseAppService = await this.appService.handle(requestApi);
    this.result(
      routeContext,
      responseAppService,
      ResponseApiStatusCode.CADASTRO
    );
  }
}
