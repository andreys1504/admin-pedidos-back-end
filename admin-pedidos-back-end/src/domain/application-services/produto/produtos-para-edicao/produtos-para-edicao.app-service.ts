import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ProdutoRepository } from "../../../../infra/data/repositories/produto.repository";
import { TipoProdutoRepository } from "../../../../infra/data/repositories/tipo-produto.repository";
import { Produto, TipoProduto } from "../../../entities";
import { ProdutosParaEdicaoRequest } from "./produtos-para-edicao.request";

export class ProdutosParaEdicaoAppService extends AppService<Produto[]> {
    private readonly tipoProdutoRepository = new TipoProdutoRepository();
    private readonly produtoRepository = new ProdutoRepository();

    async handleAsync(request: ProdutosParaEdicaoRequest) {
        if(request.validate() === false) {
            this.returnNotifications(request.getNotifications);
        }

        const tiposProduto = await this.tiposProduto();

        let opcoesBusca: any = {};
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        opcoesBusca.entidadesRelacionadas = ['imagens'];
        opcoesBusca.retornarImagens = true;

        let produtos: Produto[] = [];

        if (request.requestModel.descricao) {
            produtos = await this.produtoRepository.produtosPorConteudoDescricao({
                descricao: request.requestModel.descricao,
                camposRetorno: opcoesBusca.camposRetorno,
                retornarImagens: opcoesBusca.retornarImagens
            });
        }
        else if (request.requestModel.idProduto) {
            opcoesBusca.filtro = { id: request.requestModel.idProduto };
        }

        produtos = await this.produtoRepository.entidadesAsync(opcoesBusca);

        if (produtos && produtos.length > 0
            && tiposProduto && tiposProduto.length > 0)
            produtos = this.vincularTipoProduto({ produtos, tiposProduto });

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

    private async tiposProduto() {
        const opcoesBuscaTiposProduto: any = {
            camposRetorno: ['id', 'descricao'],
            ordenacao: { descricao: 'ASC' }
        }
        return await this.tipoProdutoRepository.entidadesAsync(opcoesBuscaTiposProduto);
    }
}
