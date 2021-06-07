import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { PedidosParaTratamentoViewModelServicoApp } from "./pedidos-para-tratamento.view-model.servico-app";
import { ClienteRepositorio } from "../../../../repositorios/cliente.repositorio";
import { TabelasBancoDados } from "../../../../../0-core/infra/dados/tabelas-banco-dados.app";
import { PedidoRepositorio } from "../../../../repositorios/pedido.repositorio";
import { Nao, Nulo } from "../../../../../0-core/helpers";

export class PedidosParaTratamentoServicoApp extends ServicoAplicacao {
    private readonly _pedidoRepositorio = new PedidoRepositorio();

    async executar(model: PedidosParaTratamentoViewModelServicoApp) {
        const pedidos = await this.buscarPedidosParaEdicao(model);

        return this.retornoSucesso(pedidos);
    }

    private async buscarPedidosParaEdicao(filtros: PedidosParaTratamentoViewModelServicoApp) {
        const clienteRepositorio = new ClienteRepositorio();
        const opcoesBusca: any = {};
        opcoesBusca.filtro = {};

        if (filtros.idPedido)
            opcoesBusca.filtro = { id: filtros.idPedido };
        else if (filtros.cpfCnpj) {
            const opcoesBusca: any = {
                filtro: { cpfCnpj: filtros.cpfCnpj }
            };
            const idCliente = (await clienteRepositorio.retornarEntidade(opcoesBusca))?.id;
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
            TabelasBancoDados.TIPO_PEDIDO,
            TabelasBancoDados.SITUACAO_EXTERNA_PEDIDO,
            TabelasBancoDados.CLIENTE,
            TabelasBancoDados.TIPO_PAGAMENTO_PEDIDO,
            'usuarioResponsavelPedido',
            'itensPedido',
            'itensPedido.' + TabelasBancoDados.PRODUTO,
            'itensPedido.' + TabelasBancoDados.SITUACAO_EXTERNA_ITEM_PEDIDO,
            'itensPedido.' + TabelasBancoDados.SITUACAO_INTERNA_ITEM_PEDIDO,
        ]

        return await this._pedidoRepositorio.retornarColecaoEntidade(opcoesBusca);
    }
}