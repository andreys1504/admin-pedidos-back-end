export interface CadastroPedidoRequestApi {
    idTipoPedido: number;
    dataEmissaoPedido: string,
    idSituacaoExternaPedido: number,
    idTipoPagamento: number | null,
    idClienteVinculadoPedido: number,
    itensPedido: ItemPedidoCadastro[],
    dataPrevisaoEntrega: string | null;
    tamanhoItensPedido: string | null;
    dataFinalizacaoPedido: string | null;
    idUsuarioResponsavelPedido: number | null;
}

export interface ItemPedidoCadastro {
    quantidade: number;
    idProduto: number;
    idSituacaoInternaItemPedido: number;
    idSituacaoExternaItemPedido: number;
    valorUnitario: string;
    nomeFuncionarioResponsavel: string | null;
}
