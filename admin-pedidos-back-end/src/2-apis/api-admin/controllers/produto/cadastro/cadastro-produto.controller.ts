import { CadastroProdutoViewModelController } from "./cadastro-produto.view-model.controller";
import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { CadastroProdutoServicoApp } from "../../../../../0-dominio/aplicacao/servicos/produto/cadastro/cadastro-produto.servico-app";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";

export class CadastroProdutoController extends ControllerApiAdminApp {
    private readonly _cadastroProdutoServicoApp = new CadastroProdutoServicoApp();

    async executar(contexto: ContextoRota) {
        const requisicao = (contexto.requisicao.body as CadastroProdutoViewModelController);
        const resultadoServico = await this._cadastroProdutoServicoApp.executar(requisicao);
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.CADASTRO);
    }
}