import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { SituacaoExternaPedidoRepository } from "../../../../infra/data/repositories/situacao-externa-pedido.repository";
import { SituacaoExternaPedido } from "../../../entities";

export class SituacoesExternasPedidoAppService extends AppService<
  SituacaoExternaPedido[]
> {
  private readonly situacaoExternaRepository =
    new SituacaoExternaPedidoRepository();

  async handleAsync() {
    const opcoesBusca: any = { camposRetorno: ["id", "descricao", "ativo"] };
    opcoesBusca.ordenacao = { descricao: "ASC" };
    const situacoesExternasPedido =
      await this.situacaoExternaRepository.entidadesAsync(opcoesBusca);

    return this.returnData(situacoesExternasPedido);
  }
}
