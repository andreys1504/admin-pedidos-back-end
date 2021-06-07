import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { ProdutosParaEdicaoServicoApp } from "../../../../../0-dominio/aplicacao/servicos/produto/produtos-para-edicao/produtos-para-edicao.servico-app";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";

export class ProdutosParaEdicaoController extends ControllerApiAdminApp {
    private readonly _produtosParaEdicaoServicoApp = new ProdutosParaEdicaoServicoApp();

    async executar(contexto: ContextoRota) {
        const descricao = contexto.requisicao.query.descricao;
        const resultadoServico =
            await this._produtosParaEdicaoServicoApp.executar({
                descricao: descricao as string,
                idProduto: 0,
            });

        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.LISTAGEM);
    }
}