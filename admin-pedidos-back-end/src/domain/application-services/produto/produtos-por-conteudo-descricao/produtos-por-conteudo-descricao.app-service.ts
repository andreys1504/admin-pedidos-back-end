import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ValidacaoDados } from "../../../../core/helpers";
import { ProdutoRepositorio } from "../../../../infra/data/repositories/produto.repositorio";
import { TipoProdutoRepositorio } from "../../../../infra/data/repositories/tipo-produto.repositorio";
import { Produto, TipoProduto } from "../../../entities";
import { ProdutosPorConteudoDescricaoRequest } from "./produtos-por-conteudo-descricao.request";

export class ProdutosPorConteudoDescricaoAppService extends AppService {
    private readonly validacaoDados = new ValidacaoDados();
    private readonly tipoProdutoRepositorio = new TipoProdutoRepositorio();
    private readonly produtoRepositorio = new ProdutoRepositorio();

    async executar(model: ProdutosPorConteudoDescricaoRequest) {
        this.validacaoDados.obrigatorio(model.descricao, 'PRODUTO não informado');
        if (!Produto.nomeProdutoValido(model.descricao))
            this.validacaoDados.adicionarMensagem('PRODUTO inválido');

        if (!this.validacaoDados.valido())
            return this.retornoErro([]);

        const opcoesBuscaTipos: any = { camposRetorno: ['id', 'descricao'] };
        const tiposProduto = await this.tipoProdutoRepositorio.retornarColecaoEntidade(opcoesBuscaTipos);

        const camposRetornoProdutos = [
            'id',
            'descricao',
            'ativo',
            'valorUnitario',
            'tipoProdutoId'
        ];
        let produtos = await this.produtoRepositorio.produtosPorConteudoDescricao({
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
