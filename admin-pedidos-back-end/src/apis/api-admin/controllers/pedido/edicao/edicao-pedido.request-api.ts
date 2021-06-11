export interface EdicaoPedidoRequestApi {
    idPedido: number;
    idTipoPedido: number;
    dataEmissaoPedido: string,
    idSituacaoExternaPedido: number,
    idTipoPagamento: number | null,
    idClienteVinculadoPedido: number,
    itensPedido: ItemPedidoEdicao[],
    dataPrevisaoEntrega: string | null;
    tamanhoItensPedido: string | null;
    dataFinalizacaoPedido: string | null;
    idUsuarioResponsavelPedido: number | null;
}

export interface ItemPedidoEdicao {
    id: number;
    quantidade: number;
    idProduto: number;
    idSituacaoInternaItemPedido: number;
    idSituacaoExternaItemPedido: number;
    valorUnitario: string;
    nomeFuncionarioResponsavel: string | null;
}
