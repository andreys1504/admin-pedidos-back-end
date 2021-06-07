export interface PedidosParaTratamentoViewModelServicoApp {
    idPedido?: number;
    cpfCnpj?: string;
    dataEmissaoPedido?: string;
    pedidosPendentes?: boolean;
    idUsuarioResponsavelPedido?: number;
    pedidoRealizadoLojaVirtual: boolean;
}