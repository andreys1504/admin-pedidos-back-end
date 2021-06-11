import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoProdutoRepositorio } from "../../../../infra/data/repositories/tipo-produto.repositorio";

export class TiposProdutosCadastradosAppService extends AppService {
    private readonly tipoProdutoRepositorio = new TipoProdutoRepositorio();

    async executar() {
        const opcoesBusca: any = { camposRetorno: ['id', 'descricao', 'ativo'] };
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        const tiposProduto = await this.tipoProdutoRepositorio.retornarColecaoEntidade(opcoesBusca);

        return this.retornoSucesso(tiposProduto);
    }
}
