import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { SituacaoExternaPedidoRepository } from "../../../../infra/data/repositories/situacao-externa-pedido.repository";
import { SituacaoExternaPedido } from "../../../entities";

export class SituacoesExternasPedidoAtivasAppService extends AppService<
  SituacaoExternaPedido[]
> {
  private readonly situacaoExternaRepository =
    new SituacaoExternaPedidoRepository();

  async handleAsync() {
    const opcoesBusca: any = {};
    opcoesBusca.camposRetorno = ["id", "descricao"];
    opcoesBusca.ordenacao = { descricao: "ASC" };
    opcoesBusca.filtro = { ativo: true };

    const situacoesExternasPedido =
      await this.situacaoExternaRepository.entidadesAsync(opcoesBusca);
    return this.returnData(situacoesExternasPedido);
  }
}
