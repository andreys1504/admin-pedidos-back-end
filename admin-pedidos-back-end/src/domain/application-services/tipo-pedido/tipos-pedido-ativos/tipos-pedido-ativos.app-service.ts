import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoPedidoRepository } from "../../../../infra/data/repositories/tipo-pedido.repository";
import { TipoPedido } from "../../../entities";

export class TiposPedidoAtivosAppService extends AppService<TipoPedido[]> {
  private readonly tipoPedidoRepository = new TipoPedidoRepository();

  async handleAsync() {
    const opcoesBusca: any = {};
    opcoesBusca.camposRetorno = ["id", "descricao"];
    opcoesBusca.ordenacao = { descricao: "ASC" };
    opcoesBusca.filtro = { ativo: true };

    const tiposPedido = await this.tipoPedidoRepository.entidadesAsync(
      opcoesBusca
    );
    return this.returnData(tiposPedido);
  }
}
