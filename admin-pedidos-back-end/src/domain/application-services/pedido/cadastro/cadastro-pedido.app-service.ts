import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { PedidoRepository } from "../../../../infra/data/repositories/pedido.repository";
import { Pedido } from "../../../entities";
import { CadastroPedidoRequest, ItemPedidoCadastroModel } from "./cadastro-pedido.request";

export class CadastroPedidoAppService extends AppService<Pedido> {
    private readonly pedidoRepository = new PedidoRepository();

    async handleAsync(request: CadastroPedidoRequest) {
        if (request.validate() === false) {
            return this.returnNotifications(request.getNotifications);
        }

        const dadosCadastro = request.requestModel;

        let itensPedido = dadosCadastro.itensPedido.map((item: ItemPedidoCadastroModel) => {
            return {
                quantidade: item.quantidade,
                idProduto: item.idProduto,
                idSituacaoExternaItemPedido: item.idSituacaoExternaItemPedido,
                idSituacaoInternaItemPedido: item.idSituacaoInternaItemPedido,
                valorUnitario: item.valorUnitario,
                nomeFuncionarioResponsavel: item.nomeFuncionarioResponsavel
            }
        });

        const novoPedido = new Pedido();
        novoPedido.novoPedido({
            dataEmissaoPedido: dadosCadastro.dataEmissaoPedido,
            usuarioRegistroPedidoId: dadosCadastro.idUsuarioRegistroPedido,
            situacaoExternaPedidoId: dadosCadastro.idSituacaoExternaPedido,
            tipoPagamentoPedidoId: dadosCadastro.idTipoPagamento,
            clienteId: dadosCadastro.idClienteVinculadoPedido,
            tipoPedidoId: dadosCadastro.idTipoPedido,
            dataPrevisaoEntrega: dadosCadastro.dataPrevisaoEntrega,
            tamanhoItensPedido: dadosCadastro.tamanhoItensPedido,
            dataFinalizacaoPedido: dadosCadastro.dataFinalizacaoPedido,
            idUsuarioResponsavelPedido: dadosCadastro.idUsuarioResponsavelPedido,
            itensPedido: itensPedido
        });

        await this.pedidoRepository.salvarAsync(novoPedido);
        
        return this.returnData(novoPedido);
    }
}
