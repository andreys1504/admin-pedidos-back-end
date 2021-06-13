import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoPagamentoRepository } from "../../../../infra/data/repositories/tipo-pagamento-pedido.repository";
import { TipoPagamentoPedido } from "../../../entities";

export class TiposPagamentoAtivosAppService extends AppService<
  TipoPagamentoPedido[]
> {
  private readonly tipoPagamentoRepository = new TipoPagamentoRepository();

  async handleAsync() {
    const opcoesBusca: any = {};
    opcoesBusca.camposRetorno = ["id", "descricao"];
    opcoesBusca.ordenacao = { descricao: "ASC" };
    opcoesBusca.filtro = { ativo: true };

    const tiposPagamamentos =
      await this.tipoPagamentoRepository.entidadesAsync(opcoesBusca);
      
    return this.returnData(tiposPagamamentos);
  }
}
