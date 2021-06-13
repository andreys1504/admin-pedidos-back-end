import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoPagamentoRepository } from "../../../../infra/data/repositories/tipo-pagamento-pedido.repository";
import { TipoPagamentoPedido } from "../../../entities";
import { CadastroTipoPagamentoRequest } from "./cadastro-tipo-pagamento.request";

export class CadastroTipoPagamentoPedidoAppService extends AppService<TipoPagamentoPedido> {
  private readonly tipoPagamentoRepository = new TipoPagamentoRepository();

  async handleAsync(request: CadastroTipoPagamentoRequest) {
    if (request.validate() === false) {
      return this.returnNotifications(request.getNotifications);
    }

    const opcoesBuscaPorId: any = {};
    opcoesBuscaPorId.camposRetorno = ["id"];
    opcoesBuscaPorId.filtro = { id: request.requestModel.id };
    if (await this.tipoPagamentoRepository.entidadeAsync(opcoesBuscaPorId)) {
      return this.returnNotification("id", "ID já existente no sistema");
    }

    const opcoesBuscaPorDescricao: any = {};
    opcoesBuscaPorDescricao.camposRetorno = ["id"];
    opcoesBuscaPorDescricao.filtro = {
      descricao: request.requestModel.descricao,
    };
    if (
      await this.tipoPagamentoRepository.entidadeAsync(
        opcoesBuscaPorDescricao
      )
    ) {
      return this.returnNotification(
        "descricao",
        "DESCRIÇÃO já existente no sistema"
      );
    }

    const tipoPagamento = new TipoPagamentoPedido();
    tipoPagamento.novoTipoPagamento({
      id: request.requestModel.id,
      descricao: request.requestModel.descricao,
      ativo: request.requestModel.ativo,
    });
    await this.tipoPagamentoRepository.salvarAsync(tipoPagamento);

    return this.returnData(tipoPagamento);
  }
}
