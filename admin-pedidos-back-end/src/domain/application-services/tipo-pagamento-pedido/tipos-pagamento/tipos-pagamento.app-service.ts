import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoPagamentoRepository } from "../../../../infra/data/repositories/tipo-pagamento-pedido.repository";
import { TipoPagamentoPedido } from "../../../entities";

export class TiposPagamentoAppService extends AppService<
  TipoPagamentoPedido[]
> {
  private readonly tipoPagamentoRepository = new TipoPagamentoRepository();

  async handleAsync() {
    const opcoesBusca: any = { camposRetorno: ["id", "descricao", "ativo"] };
    opcoesBusca.ordenacao = { descricao: "ASC" };
    const tiposPagamento =
      await this.tipoPagamentoRepository.entidadesAsync(opcoesBusca);

    return this.returnData(tiposPagamento);
  }
}
