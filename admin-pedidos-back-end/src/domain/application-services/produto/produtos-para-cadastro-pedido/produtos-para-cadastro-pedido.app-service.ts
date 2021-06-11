import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ProdutoRepository } from "../../../../infra/data/repositories/produto.repository";

export class ProdutosParaCadastroPedidoAppService extends AppService {
    private readonly produtoRepository = new ProdutoRepository();

    async handle() {
        let opcoesBusca: any = {};
        opcoesBusca.camposRetorno = ['id', 'descricao', 'valorUnitario'];
        opcoesBusca.filtro = { ativo: true };
        opcoesBusca.ordernacao = { descricao: 'ASC' }

        const produtos = await this.produtoRepository.retornarColecaoEntidade(opcoesBusca);
        return this.returnSuccess(produtos);
    }
}
