export interface PedidosParaTratamentoViewModelController {
    idPedido?: number;
    cpfCnpj?: string;
    dataEmissaoPedido?: string;
    pedidosPendentes?: boolean | undefined;
    idUsuarioResponsavelPedido?: number;
    pedidoRealizadoLojaVirtual: boolean;
}