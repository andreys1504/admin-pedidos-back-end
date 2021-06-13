import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { SituacaoExternaItemPedidoRepository } from "../../../../infra/data/repositories/situacao-externa-item-pedido.repository";
import { SituacaoExternaItemPedido } from "../../../entities";
import { CadastroSituacaoExternaItemPedidoRequest } from "./cadastro-situacao-externa-item-pedido.request";

export class CadastroSituacaoExternaItemPedidoAppService extends AppService<SituacaoExternaItemPedido> {
  private readonly situacaoExternaItemRepository =
    new SituacaoExternaItemPedidoRepository();

  async handleAsync(request: CadastroSituacaoExternaItemPedidoRequest) {
    if (request.validate() === false) {
      return this.returnNotifications(request.getNotifications);
    }

    let opcoesBuscaPorId: any = {};
    opcoesBuscaPorId.camposRetorno = ["id"];
    opcoesBuscaPorId.filtro = { id: request.requestModel.id };
    if (
      await this.situacaoExternaItemRepository.entidadeAsync(
        opcoesBuscaPorId
      )
    ) {
      return this.returnNotification("id", "ID já existente no sistema");
    }

    let opcoesBuscaPorDescricao: any = {};
    opcoesBuscaPorDescricao.camposRetorno = ["id"];
    opcoesBuscaPorDescricao.filtro = {
      descricao: request.requestModel.descricao,
    };
    if (
      await this.situacaoExternaItemRepository.entidadeAsync(
        opcoesBuscaPorDescricao
      )
    ) {
      return this.returnNotification(
        "descricao",
        "DESCRIÇÃO já existente no sistema"
      );
    }

    const situacaoExternaItemPedido = new SituacaoExternaItemPedido();
    situacaoExternaItemPedido.novaSituacaoExternaItemPedido({
      id: request.requestModel.id,
      descricao: request.requestModel.descricao,
      ativo: request.requestModel.ativo,
    });
    await this.situacaoExternaItemRepository.salvarAsync(
      situacaoExternaItemPedido
    );

    return this.returnData(situacaoExternaItemPedido);
  }
}
