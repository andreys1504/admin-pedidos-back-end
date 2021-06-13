import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { SituacaoExternaItemPedidoRepository } from "../../../../infra/data/repositories/situacao-externa-item-pedido.repository";
import { SituacaoExternaItemPedido } from "../../../entities";

export class SituacoesExternasItemPedidoAppService extends AppService<
  SituacaoExternaItemPedido[]
> {
  private readonly situacaoExternaItemRepository =
    new SituacaoExternaItemPedidoRepository();

  async handleAsync() {
    const opcoesBusca: any = { camposRetorno: ["id", "descricao", "ativo"] };
    opcoesBusca.ordenacao = { descricao: "ASC" };
    const situacoesExternasItem =
      await this.situacaoExternaItemRepository.entidadesAsync(
        opcoesBusca
      );

    return this.returnData(situacoesExternasItem);
  }
}
