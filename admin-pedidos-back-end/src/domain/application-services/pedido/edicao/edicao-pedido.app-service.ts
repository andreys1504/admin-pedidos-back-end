import {
  EdicaoPedidoRequest,
  ItemPedidoEdicaoModel,
} from "./edicao-pedido.request";
import { PedidosParaTratamentoAppService } from "../pedidos-para-tratamento/pedidos-para-tratamento.app-service";
import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { PedidoRepository } from "../../../../infra/data/repositories/pedido.repository";
import { PedidoItem } from "../../../entities";
import { PedidosParaTratamentoRequest } from "../pedidos-para-tratamento/pedidos-para-tratamento.request";

export class EdicaoPedidoAppService extends AppService<any> {
  private readonly pedidoRepository = new PedidoRepository();
  private readonly pedidosParaTratamentoAppService =
    new PedidosParaTratamentoAppService();

  async handleAsync(request: EdicaoPedidoRequest) {
    if (request.validate() === false) {
      return this.returnNotifications(request.getNotifications);
    }

    const dadosEdicao = request.requestModel;

    let itensPedido = dadosEdicao.itensPedido.map(
      (item: ItemPedidoEdicaoModel) => {
        const pedidoItem = new PedidoItem();
        pedidoItem.novoPedidoItem({
          id: null,
          idPedido: dadosEdicao.idPedido,
          idProduto: item.idProduto,
          quantidade: item.quantidade,
          idSituacaoInternaItemPedido: item.idSituacaoInternaItemPedido,
          idSituacaoExternaItemPedido: item.idSituacaoExternaItemPedido,
          valorUnitario: item.valorUnitario,
          nomeFuncionarioResponsavel: item.nomeFuncionarioResponsavel,
        });

        return pedidoItem;
      }
    );

    const opcoesBuscaPedido: any = {
      filtro: { id: dadosEdicao.idPedido },
    };
    const pedidoParaEdicao = await this.pedidoRepository.entidadeAsync(
      opcoesBuscaPedido
    );
    if (!pedidoParaEdicao) {
      throw new Error("PEDIDO inválido");
    }

    pedidoParaEdicao.editar({
      idTipoPedido: dadosEdicao.idTipoPedido,
      dataEmissaoPedido: dadosEdicao.dataEmissaoPedido,
      idSituacaoExternaPedido: dadosEdicao.idSituacaoExternaPedido,
      idTipoPagamento: dadosEdicao.idTipoPagamento,
      dataPrevisaoEntrega: dadosEdicao.dataPrevisaoEntrega,
      dataFinalizacaoPedido: dadosEdicao.dataFinalizacaoPedido,
      idClienteVinculadoPedido: dadosEdicao.idClienteVinculadoPedido,
      tamanhoItensPedido: dadosEdicao.tamanhoItensPedido,
      idUsuarioResponsavelPedido: dadosEdicao.idUsuarioResponsavelPedido,
    });

    await this.pedidoRepository.editar({
      pedido: pedidoParaEdicao,
      pedidoItens: itensPedido,
    });

    const pedidoEditado =
      await this.pedidosParaTratamentoAppService.handleAsync(new PedidosParaTratamentoRequest({
        idPedido: pedidoParaEdicao.id,
        cpfCnpj: undefined,
        dataEmissaoPedido: undefined,
        pedidosPendentes: undefined,
        idUsuarioResponsavelPedido: undefined,
        pedidoRealizadoLojaVirtual: false,
      }));

    return this.returnData(pedidoEditado.data[0]);
  }
}
