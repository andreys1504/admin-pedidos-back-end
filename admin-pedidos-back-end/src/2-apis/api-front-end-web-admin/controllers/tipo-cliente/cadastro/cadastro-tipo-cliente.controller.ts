import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { CadastroTipoClienteServicoApp } from "../../../../../0-dominio/aplicacao/servicos/tipo-cliente/cadastro/cadastro-tipo-cliente.servico-app";
import { CadastroTipoClienteViewModelController } from "./cadastro-tipo-cliente.view-model.controller";
import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ValidacaoDados } from "../../../../../0-core/helpers";
import { TipoClienteRepositorio } from "../../../../../0-dominio/repositorios/tipo-cliente.repositorio";

export class CadastroTipoClienteController extends ControllerApiAdminApp {
  private readonly _cadastroTipoClienteServicoApp =
    new CadastroTipoClienteServicoApp(
      new ValidacaoDados(),
      new TipoClienteRepositorio()
    );

  async executar(contexto: ContextoRota) {
    const modelServicoApp = contexto.requisicao
      .body as CadastroTipoClienteViewModelController;
    const resultadoServico = await this._cadastroTipoClienteServicoApp.executar(
      modelServicoApp
    );
    this.resultadoController(
      contexto.resposta,
      resultadoServico,
      StatusCodeRespostas.CADASTRO
    );
  }
}
