import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoPagamentoRepository } from "../../../../infra/data/repositories/tipo-pagamento-pedido.repository";

export class TiposPagamentoAtivosAppService extends AppService {
    private readonly tipoPagamentoRepository = new TipoPagamentoRepository();
    
    async handle() {
        const opcoesBusca: any = {};
        opcoesBusca.camposRetorno = ['id', 'descricao'];
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        opcoesBusca.filtro = { ativo: true };

        const tiposPagamamentos = await this.tipoPagamentoRepository.retornarColecaoEntidade(opcoesBusca);
        return this.returnSuccess(tiposPagamamentos);
    }
}
