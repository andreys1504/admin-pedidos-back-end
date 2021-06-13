import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoPedidoRepository } from "../../../../infra/data/repositories/tipo-pedido.repository";
import { TipoPedido } from "../../../entities";
import { CadastroTipoPedidoRequest } from "./cadastro-tipo-pedido.request";

export class CadastroTipoPedidoAppService extends AppService<TipoPedido> {
  private readonly tipoPedidoRepository = new TipoPedidoRepository();

  async handleAsync(request: CadastroTipoPedidoRequest) {
    if (request.validate() === false) {
      return this.returnNotifications(request.getNotifications);
    }

    const opcoesBuscaPorId: any = {};
    opcoesBuscaPorId.camposRetorno = ["id"];
    opcoesBuscaPorId.filtro = { id: request.requestModel.id };
    if (await this.tipoPedidoRepository.entidadeAsync(opcoesBuscaPorId)) {
      return this.returnNotification("id", "ID já existente no sistema");
    }

    const opcoesBuscaPorDescricao: any = {};
    opcoesBuscaPorDescricao.camposRetorno = ["id"];
    opcoesBuscaPorDescricao.filtro = {
      descricao: request.requestModel.descricao,
    };
    if (
      await this.tipoPedidoRepository.entidadeAsync(opcoesBuscaPorDescricao)
    ) {
      return this.returnNotification(
        "descricao",
        "DESCRIÇÃO já existente no sistema"
      );
    }

    const tipoPedido = new TipoPedido();
    tipoPedido.novoTipoPedido({
      id: request.requestModel.id,
      descricao: request.requestModel.descricao,
      ativo: request.requestModel.ativo,
    });
    await this.tipoPedidoRepository.salvarAsync(tipoPedido);

    return this.returnData(tipoPedido);
  }
}
