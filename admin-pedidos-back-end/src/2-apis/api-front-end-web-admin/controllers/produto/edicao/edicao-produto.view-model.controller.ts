export interface EdicaoProdutoViewModelController {
    detalhesProduto: string;
    imagensDestaqueOriginais: string[];
    novasImagensDestaqueEmBase64: string[];
    destaqueTelaPrincipal: boolean;
    descricao: string; 
    valorUnitario: string;
    idTipoProduto: number;
    demaisImagensOriginais: string[];
    novasDemaisImagensEmBase64: string[];
}