import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { SituacaoInternaItemPedidoRepository } from "../../../../infra/data/repositories/situacao-interna-item-pedido.repository";
import { SituacaoInternaItemPedido } from "../../../entities";

export class SituacoesInternasItemPedidoAppService extends AppService<
  SituacaoInternaItemPedido[]
> {
  private readonly situacaoInternaItemRepository =
    new SituacaoInternaItemPedidoRepository();

  async handleAsync() {
    const opcoesBusca: any = { camposRetorno: ["id", "descricao", "ativo"] };
    opcoesBusca.ordenacao = { descricao: "ASC" };
    const situacoesInternasItem =
      await this.situacaoInternaItemRepository.entidadesAsync(
        opcoesBusca
      );

    return this.returnData(situacoesInternasItem);
  }
}
