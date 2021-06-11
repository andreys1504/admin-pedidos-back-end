import { ControllerApiAdmin } from "../../../../../core/apis/controllers/controller-api-admin";
import { ResponseApiStatusCode } from "../../../../../core/apis/controllers/response-api-status-code";
import { RouteContext } from "../../../../../core/apis/routes/route-context";
import { ValidacaoDados } from "../../../../../core/helpers";
import { CadastroTipoClienteAppService } from "../../../../../domain/application-services/tipo-cliente/cadastro/cadastro-tipo-cliente.app-service";
import { TipoClienteRepositorio } from "../../../../../infra/data/repositories/tipo-cliente.repositorio";
import { CadastroTipoClienteRequestApi } from "./cadastro-tipo-cliente.request-api";

export class CadastroTipoClienteController extends ControllerApiAdmin {
  private readonly cadastroTipoClienteServicoApp =
    new CadastroTipoClienteAppService(
      new ValidacaoDados(),
      new TipoClienteRepositorio()
    );

  async executar(contexto: RouteContext) {
    const modelServicoApp = contexto.requisicao
      .body as CadastroTipoClienteRequestApi;
    const resultadoServico = await this.cadastroTipoClienteServicoApp.executar(
      modelServicoApp
    );
    this.resultadoController(
      contexto.resposta,
      resultadoServico,
      ResponseApiStatusCode.CADASTRO
    );
  }
}
