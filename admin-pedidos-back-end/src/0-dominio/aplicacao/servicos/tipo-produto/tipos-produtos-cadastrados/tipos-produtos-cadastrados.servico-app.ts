import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao"
import { TipoProdutoRepositorio } from "../../../../repositorios/tipo-produto.repositorio";

export class TiposProdutosCadastradosServicoApp extends ServicoAplicacao {
    private readonly _tipoProdutoRepositorio = new TipoProdutoRepositorio();

    async executar() {
        const opcoesBusca: any = { camposRetorno: ['id', 'descricao', 'ativo'] };
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        const tiposProduto = await this._tipoProdutoRepositorio.retornarColecaoEntidade(opcoesBusca);

        return this.retornoSucesso(tiposProduto);
    }
}