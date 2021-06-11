export interface PedidosParaTratamentoRequest {
    idPedido?: number;
    cpfCnpj?: string | undefined;
    dataEmissaoPedido?: string | undefined;
    pedidosPendentes?: boolean | undefined;
    idUsuarioResponsavelPedido?: number | undefined;
    pedidoRealizadoLojaVirtual: boolean;
}