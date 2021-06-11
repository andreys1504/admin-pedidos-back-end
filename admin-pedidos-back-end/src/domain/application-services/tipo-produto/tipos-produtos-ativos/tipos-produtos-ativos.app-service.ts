import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoProdutoRepositorio } from "../../../../infra/data/repositories/tipo-produto.repositorio";

export class TiposProdutosAtivosAppService extends AppService {
    protected readonly tipoProdutoRepositorio = new TipoProdutoRepositorio();

    async executar() {
        const opcoesBusca: any = {};
        opcoesBusca.camposRetorno = ['id', 'descricao'];
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        opcoesBusca.filtro = { ativo: true };

        const tiposProduto = await this.tipoProdutoRepositorio.retornarColecaoEntidade(opcoesBusca);
        return this.retornoSucesso(tiposProduto);
    }
}
