import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { ProdutosPorConteudoDescricaoViewModelServicoApp } from "./produtos-por-conteudo-descricao.view-model.servico-app";
import { ValidacaoDados } from "../../../../../0-core/helpers";
import { Produto, TipoProduto } from "../../../../entidades";
import { TipoProdutoRepositorio } from "../../../../repositorios/tipo-produto.repositorio";
import { ProdutoRepositorio } from "../../../../repositorios/produto.repositorio";

export class ProdutosPorConteudoDescricaoServicoApp extends ServicoAplicacao {
    private readonly _validacaoDados = new ValidacaoDados();
    private readonly _tipoProdutoRepositorio = new TipoProdutoRepositorio();
    private readonly _produtoRepositorio = new ProdutoRepositorio();

    async executar(model: ProdutosPorConteudoDescricaoViewModelServicoApp) {
        this._validacaoDados.obrigatorio(model.descricao, 'PRODUTO não informado');
        if (!Produto.nomeProdutoValido(model.descricao))
            this._validacaoDados.adicionarMensagem('PRODUTO inválido');

        if (!this._validacaoDados.valido())
            return this.retornoErro([]);

        const opcoesBuscaTipos: any = { camposRetorno: ['id', 'descricao'] };
        const tiposProduto = await this._tipoProdutoRepositorio.retornarColecaoEntidade(opcoesBuscaTipos);

        const camposRetornoProdutos = [
            'id',
            'descricao',
            'ativo',
            'valorUnitario',
            'tipoProdutoId'
        ];
        let produtos = await this._produtoRepositorio.produtosPorConteudoDescricao({
            descricao: model.descricao,
            camposRetorno: camposRetornoProdutos
        });

        if (tiposProduto && tiposProduto.length > 0 && produtos && produtos.length > 0)
            produtos = this.vincularTipoProduto({ produtos, tiposProduto });

        return this.retornoSucesso(produtos);
    }

    private vincularTipoProduto(entidades: {
        produtos: Produto[],
        tiposProduto: TipoProduto[]
    }) {
        entidades.produtos = entidades.produtos.map(produto => {
            produto.tipoProduto
                = entidades.tiposProduto.find(tipo => tipo.id === produto.tipoProdutoId)
                || {} as TipoProduto;
            return produto;
        });

        return entidades.produtos;
    }
}