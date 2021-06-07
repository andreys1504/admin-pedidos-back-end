import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { ProdutosPorConteudoDescricaoServicoApp } from "../../../../../0-dominio/aplicacao/servicos/produto/produtos-por-conteudo-descricao/produtos-por-conteudo-descricao.servico-app";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";

export class ProdutosPorConteudoDescricaoController extends ControllerApiAdminApp {
    private readonly _produtosPorConteudoDescricaoServicoApp = new ProdutosPorConteudoDescricaoServicoApp();

    async executar(contexto: ContextoRota) {
        const descricao = contexto.requisicao.params.descricao;
        const resultadoServico = await this._produtosPorConteudoDescricaoServicoApp.executar({ descricao });
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.LISTAGEM);
    }
}