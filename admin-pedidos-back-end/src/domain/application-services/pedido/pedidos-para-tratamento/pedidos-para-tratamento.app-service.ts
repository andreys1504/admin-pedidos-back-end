import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { IsNull, Not } from "../../../../core/helpers";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";
import { ClienteRepository } from "../../../../infra/data/repositories/cliente.repository";
import { PedidoRepository } from "../../../../infra/data/repositories/pedido.repository";
import { PedidosParaTratamentoRequest } from "./pedidos-para-tratamento.request";

export class PedidosParaTratamentoAppService extends AppService<any> {
  private readonly pedidoRepository = new PedidoRepository();
  private readonly clienteRepository = new ClienteRepository();

  async handleAsync(request: PedidosParaTratamentoRequest) {
    if (request.validate() === false) {
      return this.returnNotifications(request.getNotifications);
    }

    const opcoesBusca: any = {};
    opcoesBusca.filtro = {};

    if (request.requestModel.idPedido) {
      opcoesBusca.filtro = { id: request.requestModel.idPedido };
    } else if (request.requestModel.cpfCnpj) {
      const opcoesBusca: any = {
        filtro: { cpfCnpj: request.requestModel.cpfCnpj },
      };
      const idCliente = (
        await this.clienteRepository.entidadeAsync(opcoesBusca)
      )?.id;
      if (idCliente) {
        opcoesBusca.filtro = { clienteId: idCliente };
      }
    } else if (request.requestModel.idUsuarioResponsavelPedido) {
      opcoesBusca.filtro = {
        usuarioResponsavelPedidoId:
          request.requestModel.idUsuarioResponsavelPedido,
      };
    } else {
      if (request.requestModel.dataEmissaoPedido) {
        opcoesBusca.filtro = {
          dataEmissaoPedido: request.requestModel.dataEmissaoPedido,
        };
      }
      if (typeof request.requestModel.pedidosPendentes === "boolean") {
        if (request.requestModel.pedidosPendentes) {
          opcoesBusca.filtro = {
            ...opcoesBusca.filtro,
            dataFinalizacaoPedido: IsNull(),
          };
        } else {
          opcoesBusca.filtro = {
            ...opcoesBusca.filtro,
            dataFinalizacaoPedido: Not(IsNull()),
          };
        }
      }
    }

    opcoesBusca.entidadesRelacionadas = [
      DatabaseTables.TIPO_PEDIDO,
      DatabaseTables.SITUACAO_EXTERNA_PEDIDO,
      DatabaseTables.CLIENTE,
      DatabaseTables.TIPO_PAGAMENTO_PEDIDO,
      "usuarioResponsavelPedido",
      "itensPedido",
      "itensPedido." + DatabaseTables.PRODUTO,
      "itensPedido." + DatabaseTables.SITUACAO_EXTERNA_ITEM_PEDIDO,
      "itensPedido." + DatabaseTables.SITUACAO_INTERNA_ITEM_PEDIDO,
    ];

    const pedidos = await this.pedidoRepository.entidadesAsync(opcoesBusca);

    return this.returnData(pedidos);
  }
}
