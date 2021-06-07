import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { ProdutoRepositorio } from "../../../../repositorios/produto.repositorio";

export class ProdutosParaCadastroPedidoServicoApp extends ServicoAplicacao {
    private readonly _produtoRepositorio = new ProdutoRepositorio();

    async executar() {
        let opcoesBusca: any = {};
        opcoesBusca.camposRetorno = ['id', 'descricao', 'valorUnitario'];
        opcoesBusca.filtro = { ativo: true };
        opcoesBusca.ordernacao = { descricao: 'ASC' }

        const produtos = await this._produtoRepositorio.retornarColecaoEntidade(opcoesBusca);
        return this.retornoSucesso(produtos);
    }
}