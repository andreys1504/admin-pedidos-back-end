import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { Nulo, Nao } from "../../../../core/helpers";
import { DatabaseTables } from "../../../../core/infra/data/database-tables";
import { ClienteRepository } from "../../../../infra/data/repositories/cliente.repository";
import { PedidoRepository } from "../../../../infra/data/repositories/pedido.repository";
import { PedidosParaTratamentoRequest } from "./pedidos-para-tratamento.request";

export class PedidosParaTratamentoAppService extends AppService {
    private readonly pedidoRepository = new PedidoRepository();

    async handle(request: PedidosParaTratamentoRequest) {
        const pedidos = await this.buscarPedidosParaEdicao(request);

        return this.returnSuccess(pedidos);
    }

    private async buscarPedidosParaEdicao(filtros: PedidosParaTratamentoRequest) {
        const clienteRepository = new ClienteRepository();
        const opcoesBusca: any = {};
        opcoesBusca.filtro = {};

        if (filtros.idPedido)
            opcoesBusca.filtro = { id: filtros.idPedido };
        else if (filtros.cpfCnpj) {
            const opcoesBusca: any = {
                filtro: { cpfCnpj: filtros.cpfCnpj }
            };
            const idCliente = (await clienteRepository.retornarEntidade(opcoesBusca))?.id;
            if (idCliente)
                opcoesBusca.filtro = { clienteId: idCliente };
        }
        else if (filtros.idUsuarioResponsavelPedido)
            opcoesBusca.filtro = { usuarioResponsavelPedidoId: filtros.idUsuarioResponsavelPedido };
        else {
            if (filtros.dataEmissaoPedido)
                opcoesBusca.filtro = { dataEmissaoPedido: filtros.dataEmissaoPedido };

            if (typeof filtros.pedidosPendentes === 'boolean') {
                if (filtros.pedidosPendentes)
                    opcoesBusca.filtro = {
                        ...opcoesBusca.filtro,
                        dataFinalizacaoPedido: Nulo()
                    }
                else
                    opcoesBusca.filtro = {
                        ...opcoesBusca.filtro,
                        dataFinalizacaoPedido: Nao(Nulo())
                    }
            }

            if (filtros.pedidoRealizadoLojaVirtual)
                opcoesBusca.filtro = {
                    ...opcoesBusca.filtro,
                    pedidoRealizadoLojaVirtual: filtros.pedidoRealizadoLojaVirtual
                }
        }

        opcoesBusca.entidadesRelacionadas = [
            DatabaseTables.TIPO_PEDIDO,
            DatabaseTables.SITUACAO_EXTERNA_PEDIDO,
            DatabaseTables.CLIENTE,
            DatabaseTables.TIPO_PAGAMENTO_PEDIDO,
            'usuarioResponsavelPedido',
            'itensPedido',
            'itensPedido.' + DatabaseTables.PRODUTO,
            'itensPedido.' + DatabaseTables.SITUACAO_EXTERNA_ITEM_PEDIDO,
            'itensPedido.' + DatabaseTables.SITUACAO_INTERNA_ITEM_PEDIDO,
        ]

        return await this.pedidoRepository.retornarColecaoEntidade(opcoesBusca);
    }
}
