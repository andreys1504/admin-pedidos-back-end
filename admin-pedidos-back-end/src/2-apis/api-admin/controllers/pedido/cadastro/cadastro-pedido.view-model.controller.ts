export interface CadastroPedidoViewModelController {
    idTipoPedido: number;
    dataEmissaoPedido: string,
    idSituacaoExternaPedido: number,
    idTipoPagamento: number | null,
    idClienteVinculadoPedido: number,
    itensPedido: ItemPedidoCadastroViewModelController[],
    dataPrevisaoEntrega: string | null;
    tamanhoItensPedido: string | null;
    dataFinalizacaoPedido: string | null;
    idUsuarioResponsavelPedido: number | null;
}

export interface ItemPedidoCadastroViewModelController {
    quantidade: number;
    idProduto: number;
    idSituacaoInternaItemPedido: number;
    idSituacaoExternaItemPedido: number;
    valorUnitario: string;
    nomeFuncionarioResponsavel: string | null;
}