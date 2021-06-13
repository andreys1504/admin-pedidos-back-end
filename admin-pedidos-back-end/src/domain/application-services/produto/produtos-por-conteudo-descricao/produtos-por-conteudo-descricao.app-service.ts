import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ProdutoRepository } from "../../../../infra/data/repositories/produto.repository";
import { TipoProdutoRepository } from "../../../../infra/data/repositories/tipo-produto.repository";
import { Produto, TipoProduto } from "../../../entities";
import { ProdutosPorConteudoDescricaoRequest } from "./produtos-por-conteudo-descricao.request";

export class ProdutosPorConteudoDescricaoAppService extends AppService<Produto[]> {
    private readonly tipoProdutoRepository = new TipoProdutoRepository();
    private readonly produtoRepository = new ProdutoRepository();

    async handleAsync(request: ProdutosPorConteudoDescricaoRequest) {
        if (request.validate() === false) {
            return this.returnNotifications(request.getNotifications);
        }

        const opcoesBuscaTipos: any = { camposRetorno: ['id', 'descricao'] };
        const tiposProduto = await this.tipoProdutoRepository.entidadesAsync(opcoesBuscaTipos);

        const camposRetornoProdutos = [
            'id',
            'descricao',
            'ativo',
            'valorUnitario',
            'tipoProdutoId'
        ];
        let produtos = await this.produtoRepository.produtosPorConteudoDescricao({
            descricao: request.requestModel.descricao,
            camposRetorno: camposRetornoProdutos
        });

        if (tiposProduto && tiposProduto.length > 0 && produtos && produtos.length > 0) {
            produtos = this.vincularTipoProduto({ produtos, tiposProduto });
        }

        return this.returnData(produtos);
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
