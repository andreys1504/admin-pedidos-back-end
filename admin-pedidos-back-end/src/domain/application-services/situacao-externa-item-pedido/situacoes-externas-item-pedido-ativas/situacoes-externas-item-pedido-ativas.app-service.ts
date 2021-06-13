import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { SituacaoExternaItemPedidoRepository } from "../../../../infra/data/repositories/situacao-externa-item-pedido.repository";
import { SituacaoExternaItemPedido } from "../../../entities";

export class SituacoesExternasItemPedidoAtivasAppService extends AppService<
  SituacaoExternaItemPedido[]
> {
  private readonly situacaoExternaItemRepository =
    new SituacaoExternaItemPedidoRepository();

  async handleAsync() {
    let opcoesBusca: any = {};
    opcoesBusca.camposRetorno = ["id", "descricao"];
    opcoesBusca.ordenacao = { descricao: "ASC" };
    opcoesBusca.filtro = { ativo: true };

    const situacoesExternasItem =
      await this.situacaoExternaItemRepository.entidadesAsync(
        opcoesBusca
      );
    return this.returnData(situacoesExternasItem);
  }
}
