import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoPedidoRepository } from "../../../../infra/data/repositories/tipo-pedido.repository";
import { TipoPedido } from "../../../entities";

export class TiposPedidoAppService extends AppService<TipoPedido[]> {
  private readonly tipoPedidoRepository = new TipoPedidoRepository();

  async handleAsync() {
    const opcoesBusca: any = { camposRetorno: ["id", "descricao", "ativo"] };
    opcoesBusca.ordenacao = { descricao: "ASC" };
    const tiposPedido = await this.tipoPedidoRepository.entidadesAsync(
      opcoesBusca
    );

    return this.returnData(tiposPedido);
  }
}
