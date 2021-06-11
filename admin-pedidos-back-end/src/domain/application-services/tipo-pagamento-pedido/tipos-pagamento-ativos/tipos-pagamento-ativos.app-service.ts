import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoPagamentoRepositorio } from "../../../../infra/data/repositories/tipo-pagamento-pedido.repositorio";

export class TiposPagamentoAtivosAppService extends AppService {
    private readonly tipoPagamentoRepositorio = new TipoPagamentoRepositorio();
    
    async executar() {
        const opcoesBusca: any = {};
        opcoesBusca.camposRetorno = ['id', 'descricao'];
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        opcoesBusca.filtro = { ativo: true };

        const tiposPagamamentos = await this.tipoPagamentoRepositorio.retornarColecaoEntidade(opcoesBusca);
        return this.retornoSucesso(tiposPagamamentos);
    }
}
