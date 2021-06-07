import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { ProdutosParaEdicaoViewModelServicoApp } from "./produtos-para-edicao.view-model.servico-app";
import { TipoProdutoRepositorio } from "../../../../repositorios/tipo-produto.repositorio";
import { ProdutoRepositorio } from "../../../../repositorios/produto.repositorio";
import { Produto, TipoProduto } from "../../../../entidades";
import { ValidacaoDados } from "../../../../../0-core/helpers";

export class ProdutosParaEdicaoServicoApp extends ServicoAplicacao {
    private readonly _tipoProdutoRepositorio = new TipoProdutoRepositorio();
    private readonly _produtoRepositorio = new ProdutoRepositorio();
    private readonly _validacaoDados = new ValidacaoDados();

    async executar(model: ProdutosParaEdicaoViewModelServicoApp) {
        const tiposProduto = await this.tiposProduto();

        let opcoesBusca: any = {};
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        opcoesBusca.entidadesRelacionadas = ['imagens'];
        opcoesBusca.retornarImagens = true;

        let produtos: Produto[] = [];

        if (model.descricao) {
            this._validacaoDados.obrigatorio(model.descricao, 'PRODUTO não informado');
            if (!Produto.nomeProdutoValido(model.descricao))
                this._validacaoDados.adicionarMensagem('PRODUTO inválido');

            if (!this._validacaoDados.valido())
                return this.retornoErro([]);

            produtos = await this._produtoRepositorio.produtosPorConteudoDescricao({
                descricao: model.descricao,
                camposRetorno: opcoesBusca.camposRetorno,
                retornarImagens: opcoesBusca.retornarImagens
            });
        }
        else if (model.idProduto)
            opcoesBusca.filtro = { id: model.idProduto };

        produtos = await this._produtoRepositorio.retornarColecaoEntidade(opcoesBusca);

        if (produtos && produtos.length > 0
            && tiposProduto && tiposProduto.length > 0)
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

    private async tiposProduto() {
        const opcoesBuscaTiposProduto: any = {
            camposRetorno: ['id', 'descricao'],
            ordenacao: { descricao: 'ASC' }
        }
        return await this._tipoProdutoRepositorio.retornarColecaoEntidade(opcoesBuscaTiposProduto);
    }
}