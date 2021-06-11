import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ValidacaoDados } from "../../../../core/helpers";
import { ProdutoRepositorio } from "../../../../infra/data/repositories/produto.repositorio";
import { TipoProdutoRepositorio } from "../../../../infra/data/repositories/tipo-produto.repositorio";
import { Produto, TipoProduto } from "../../../entities";
import { ProdutosParaEdicaoRequest } from "./produtos-para-edicao.request";

export class ProdutosParaEdicaoAppService extends AppService {
    private readonly tipoProdutoRepositorio = new TipoProdutoRepositorio();
    private readonly produtoRepositorio = new ProdutoRepositorio();
    private readonly validacaoDados = new ValidacaoDados();

    async executar(model: ProdutosParaEdicaoRequest) {
        const tiposProduto = await this.tiposProduto();

        let opcoesBusca: any = {};
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        opcoesBusca.entidadesRelacionadas = ['imagens'];
        opcoesBusca.retornarImagens = true;

        let produtos: Produto[] = [];

        if (model.descricao) {
            this.validacaoDados.obrigatorio(model.descricao, 'PRODUTO não informado');
            if (!Produto.nomeProdutoValido(model.descricao))
                this.validacaoDados.adicionarMensagem('PRODUTO inválido');

            if (!this.validacaoDados.valido())
                return this.retornoErro([]);

            produtos = await this.produtoRepositorio.produtosPorConteudoDescricao({
                descricao: model.descricao,
                camposRetorno: opcoesBusca.camposRetorno,
                retornarImagens: opcoesBusca.retornarImagens
            });
        }
        else if (model.idProduto)
            opcoesBusca.filtro = { id: model.idProduto };

        produtos = await this.produtoRepositorio.retornarColecaoEntidade(opcoesBusca);

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
        return await this.tipoProdutoRepositorio.retornarColecaoEntidade(opcoesBuscaTiposProduto);
    }
}
