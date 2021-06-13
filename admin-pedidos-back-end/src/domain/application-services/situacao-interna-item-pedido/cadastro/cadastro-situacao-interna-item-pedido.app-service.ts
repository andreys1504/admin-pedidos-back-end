import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { SituacaoInternaItemPedidoRepository } from "../../../../infra/data/repositories/situacao-interna-item-pedido.repository";
import { SituacaoInternaItemPedido } from "../../../entities";
import { CadastroSituacaoInternaItemPedidoRequest } from "./cadastro-situacao-interna-item-pedido.request";

export class CadastroSituacaoInternaItemPedidoAppService extends AppService<SituacaoInternaItemPedido> {
  private readonly situacaoInternaItemRepository =
    new SituacaoInternaItemPedidoRepository();

  async handleAsync(request: CadastroSituacaoInternaItemPedidoRequest) {
    if (request.validate() === false) {
      return this.returnNotifications(request.getNotifications);
    }

    const opcoesBuscaPorId: any = {};
    opcoesBuscaPorId.camposRetorno = ["id"];
    opcoesBuscaPorId.filtro = { id: request.requestModel.id };
    if (
      await this.situacaoInternaItemRepository.entidadeAsync(
        opcoesBuscaPorId
      )
    ) {
      return this.returnNotification("id", "ID já existente no sistema");
    }

    const opcoesBuscaPorDescricao: any = {};
    opcoesBuscaPorDescricao.camposRetorno = ["id"];
    opcoesBuscaPorDescricao.filtro = {
      descricao: request.requestModel.descricao,
    };
    if (
      await this.situacaoInternaItemRepository.entidadeAsync(
        opcoesBuscaPorDescricao
      )
    ) {
      return this.returnNotification(
        "descricao",
        "DESCRIÇÃO já existente no sistema"
      );
    }

    const situacaoInternaItemPedido = new SituacaoInternaItemPedido();
    situacaoInternaItemPedido.novaSituacaoInternaItemPedido({
      id: request.requestModel.id,
      descricao: request.requestModel.descricao,
      ativo: request.requestModel.ativo,
    });
    await this.situacaoInternaItemRepository.salvarAsync(
      situacaoInternaItemPedido
    );

    return this.returnData(situacaoInternaItemPedido);
  }
}
