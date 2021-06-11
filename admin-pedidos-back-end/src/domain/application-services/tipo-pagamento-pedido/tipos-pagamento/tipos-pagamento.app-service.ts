import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoPagamentoRepository } from "../../../../infra/data/repositories/tipo-pagamento-pedido.repository";

export class TiposPagamentoAppService extends AppService {
    private readonly tipoPagamentoRepository = new TipoPagamentoRepository();

    async handle() {
        const opcoesBusca: any = { camposRetorno: ['id', 'descricao', 'ativo'] };
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        const tiposPagamento = await this.tipoPagamentoRepository.retornarColecaoEntidade(opcoesBusca);
        
        return this.returnSuccess(tiposPagamento);
    }
}
