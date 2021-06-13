export interface PedidosParaTratamentoRequestApi {
    idPedido?: number;
    cpfCnpj?: string;
    dataEmissaoPedido?: string;
    pedidosPendentes?: boolean | undefined;
    idUsuarioResponsavelPedido?: number;
}
