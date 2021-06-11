import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoPagamentoRepositorio } from "../../../../infra/data/repositories/tipo-pagamento-pedido.repositorio";

export class TiposPagamentoAppService extends AppService {
    private readonly tipoPagamentoRepositorio = new TipoPagamentoRepositorio();

    async executar() {
        const opcoesBusca: any = { camposRetorno: ['id', 'descricao', 'ativo'] };
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        const tiposPagamento = await this.tipoPagamentoRepositorio.retornarColecaoEntidade(opcoesBusca);
        
        return this.retornoSucesso(tiposPagamento);
    }
}
