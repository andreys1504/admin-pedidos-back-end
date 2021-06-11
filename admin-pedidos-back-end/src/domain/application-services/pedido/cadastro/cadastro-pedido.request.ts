export interface CadastroPedidoRequest {
    idTipoPedido: number;
    dataEmissaoPedido: string,
    idSituacaoExternaPedido: number,
    idTipoPagamento: number | null,
    idClienteVinculadoPedido: number,
    itensPedido: ItemPedidoCadastroModel[],
    dataPrevisaoEntrega: string | null;
    tamanhoItensPedido: string | null;
    dataFinalizacaoPedido: string | null;
    idUsuarioResponsavelPedido: number | null;
    idUsuarioRegistroPedido: number;
}

export interface ItemPedidoCadastroModel {
    quantidade: number;
    idProduto: number;
    idSituacaoInternaItemPedido: number;
    idSituacaoExternaItemPedido: number;
    valorUnitario: string;
    nomeFuncionarioResponsavel: string | null;
}