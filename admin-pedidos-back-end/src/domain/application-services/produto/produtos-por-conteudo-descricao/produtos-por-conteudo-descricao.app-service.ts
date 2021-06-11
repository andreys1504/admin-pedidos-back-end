import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ValidacaoDados } from "../../../../core/helpers";
import { ProdutoRepository } from "../../../../infra/data/repositories/produto.repository";
import { TipoProdutoRepository } from "../../../../infra/data/repositories/tipo-produto.repository";
import { Produto, TipoProduto } from "../../../entities";
import { ProdutosPorConteudoDescricaoRequest } from "./produtos-por-conteudo-descricao.request";

export class ProdutosPorConteudoDescricaoAppService extends AppService {
    private readonly validacaoDados = new ValidacaoDados();
    private readonly tipoProdutoRepository = new TipoProdutoRepository();
    private readonly produtoRepository = new ProdutoRepository();

    async handle(model: ProdutosPorConteudoDescricaoRequest) {
        this.validacaoDados.obrigatorio(model.descricao, 'PRODUTO não informado');
        if (!Produto.nomeProdutoValido(model.descricao))
            this.validacaoDados.adicionarMensagem('PRODUTO inválido');

        if (!this.validacaoDados.valido())
            return this.returnNotifications([]);

        const opcoesBuscaTipos: any = { camposRetorno: ['id', 'descricao'] };
        const tiposProduto = await this.tipoProdutoRepository.retornarColecaoEntidade(opcoesBuscaTipos);

        const camposRetornoProdutos = [
            'id',
            'descricao',
            'ativo',
            'valorUnitario',
            'tipoProdutoId'
        ];
        let produtos = await this.produtoRepository.produtosPorConteudoDescricao({
            descricao: model.descricao,
            camposRetorno: camposRetornoProdutos
        });

        if (tiposProduto && tiposProduto.length > 0 && produtos && produtos.length > 0)
            produtos = this.vincularTipoProduto({ produtos, tiposProduto });

        return this.returnSuccess(produtos);
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
