export interface CadastroProdutoRequest {
    detalhesProduto: string;
    imagensDestaqueEmBase64: string[];
    destaqueTelaPrincipal: boolean;
    descricao: string;
    valorUnitario: string;
    idTipoProduto: number;
    demaisImagensEmBase64: string[];
}