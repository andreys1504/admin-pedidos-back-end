import { CadastroClienteViewModelController } from "./cadastro-cliente.view-model.controller";
import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { CadastroClienteServicoApp } from "../../../../../0-dominio/aplicacao/servicos/cliente/cadastro/cadastro-cliente.servico-app";
import { CadastroClienteViewModelServicoApp } from "../../../../../0-dominio/aplicacao/servicos/cliente/cadastro/cadastro-cliente.view-model.servico-app";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";

export class CadastroClienteController extends ControllerApiAdminApp {
    private readonly _cadastroClienteServicoApp = new CadastroClienteServicoApp();

    async executar(contexto: ContextoRota) {
        const dadosCadastro = contexto.requisicao.body as CadastroClienteViewModelController;
        const dadosCadastroServicoApp = dadosCadastro as CadastroClienteViewModelServicoApp;
        const resultadoServico = await this._cadastroClienteServicoApp.executar(dadosCadastroServicoApp);

        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.CADASTRO);
    }
}