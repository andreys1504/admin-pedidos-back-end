import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { SituacaoExternaPedidoRepository } from "../../../../infra/data/repositories/situacao-externa-pedido.repository";
import { SituacaoExternaPedido } from "../../../entities";
import { CadastroSituacaoExternaPedidoRequest } from "./cadastro-situacao-externa-pedido.request";

export class CadastroSituacaoExternaPedidoAppService extends AppService<SituacaoExternaPedido> {
  private readonly situacaoExternaRepository =
    new SituacaoExternaPedidoRepository();

  async handleAsync(request: CadastroSituacaoExternaPedidoRequest) {
    if (request.validate() === false) {
      return this.returnNotifications(request.getNotifications);
    }

    const opcoesBuscaPorId: any = {};
    opcoesBuscaPorId.filtro = { id: request.requestModel.id };
    if (
      await this.situacaoExternaRepository.entidadeAsync(opcoesBuscaPorId)
    ) {
      return this.returnNotification("id", "ID já existente no sistema");
    }

    const opcoesBuscaPorDescricao: any = {};
    opcoesBuscaPorDescricao.filtro = {
      descricao: request.requestModel.descricao,
    };
    if (
      await this.situacaoExternaRepository.entidadesAsync(
        opcoesBuscaPorDescricao
      )
    ) {
      return this.returnNotification(
        "descricao",
        "DESCRIÇÃO já existente no sistema"
      );
    }

    const situacaoExternaPedido = new SituacaoExternaPedido();
    situacaoExternaPedido.novaSituacaoExternaPedido({
      id: request.requestModel.id,
      descricao: request.requestModel.descricao,
      ativo: request.requestModel.ativo,
    });
    await this.situacaoExternaRepository.salvarAsync(situacaoExternaPedido);

    return this.returnData(situacaoExternaPedido);
  }
}
