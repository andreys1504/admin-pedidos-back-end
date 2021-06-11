import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ProdutoRepositorio } from "../../../../infra/data/repositories/produto.repositorio";

export class ProdutosParaCadastroPedidoAppService extends AppService {
    private readonly produtoRepositorio = new ProdutoRepositorio();

    async executar() {
        let opcoesBusca: any = {};
        opcoesBusca.camposRetorno = ['id', 'descricao', 'valorUnitario'];
        opcoesBusca.filtro = { ativo: true };
        opcoesBusca.ordernacao = { descricao: 'ASC' }

        const produtos = await this.produtoRepositorio.retornarColecaoEntidade(opcoesBusca);
        return this.retornoSucesso(produtos);
    }
}
