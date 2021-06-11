import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoProdutoRepository } from "../../../../infra/data/repositories/tipo-produto.repository";

export class TiposProdutosCadastradosAppService extends AppService {
    private readonly tipoProdutoRepository = new TipoProdutoRepository();

    async handle() {
        const opcoesBusca: any = { camposRetorno: ['id', 'descricao', 'ativo'] };
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        const tiposProduto = await this.tipoProdutoRepository.retornarColecaoEntidade(opcoesBusca);

        return this.returnSuccess(tiposProduto);
    }
}
