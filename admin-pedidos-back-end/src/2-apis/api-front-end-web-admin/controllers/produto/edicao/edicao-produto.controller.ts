import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { EdicaoProdutoViewModelController } from "./edicao-produto.view-model.controller";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { EdicaoProdutoServicoApp } from "../../../../../0-dominio/aplicacao/servicos/produto/edicao/edicao-produto.servico-app";
import { EdicaoProdutoViewModelServicoApp } from "../../../../../0-dominio/aplicacao/servicos/produto/edicao/edicao-produto.view-model.servico-app";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";

export class EdicaoProdutoController extends ControllerApiAdminApp {
    private readonly _edicaoProdutoServicoApp = new EdicaoProdutoServicoApp();

    async executar(contexto: ContextoRota) {
        const modelServicoApp = (contexto.requisicao.body as EdicaoProdutoViewModelController) as EdicaoProdutoViewModelServicoApp;
        modelServicoApp.idProduto = Number(contexto.requisicao.params.id);

        const resultadoServico = await this._edicaoProdutoServicoApp.executar(modelServicoApp);
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.ATUALIZACAO);
    }
}