import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoProdutoRepository } from "../../../../infra/data/repositories/tipo-produto.repository";

export class TiposProdutosAtivosAppService extends AppService {
    protected readonly tipoProdutoRepository = new TipoProdutoRepository();

    async handle() {
        const opcoesBusca: any = {};
        opcoesBusca.camposRetorno = ['id', 'descricao'];
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        opcoesBusca.filtro = { ativo: true };

        const tiposProduto = await this.tipoProdutoRepository.retornarColecaoEntidade(opcoesBusca);
        return this.returnSuccess(tiposProduto);
    }
}
