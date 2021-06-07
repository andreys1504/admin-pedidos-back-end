import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { TipoProdutoRepositorio } from "../../../../repositorios/tipo-produto.repositorio";

export class TiposProdutosAtivosServicoApp extends ServicoAplicacao {
    protected readonly _tipoProdutoRepositorio = new TipoProdutoRepositorio();

    async executar() {
        const opcoesBusca: any = {};
        opcoesBusca.camposRetorno = ['id', 'descricao'];
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        opcoesBusca.filtro = { ativo: true };

        const tiposProduto = await this._tipoProdutoRepositorio.retornarColecaoEntidade(opcoesBusca);
        return this.retornoSucesso(tiposProduto);
    }
}