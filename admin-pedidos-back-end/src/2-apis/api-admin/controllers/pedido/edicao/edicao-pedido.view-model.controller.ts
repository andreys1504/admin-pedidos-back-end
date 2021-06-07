export interface EdicaoPedidoViewModelController {
    idPedido: number;
    idTipoPedido: number;
    dataEmissaoPedido: string,
    idSituacaoExternaPedido: number,
    idTipoPagamento: number | null,
    idClienteVinculadoPedido: number,
    itensPedido: ItemPedidoEdicaoViewModelController[],
    dataPrevisaoEntrega: string | null;
    tamanhoItensPedido: string | null;
    dataFinalizacaoPedido: string | null;
    idUsuarioResponsavelPedido: number | null;
}

export interface ItemPedidoEdicaoViewModelController {
    id: number;
    quantidade: number;
    idProduto: number;
    idSituacaoInternaItemPedido: number;
    idSituacaoExternaItemPedido: number;
    valorUnitario: string;
    nomeFuncionarioResponsavel: string | null;
}