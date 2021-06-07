import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { TipoPedidoRepositorio } from "../../../../repositorios/tipo-pedido.repositorio";

export class TiposPedidoServico extends ServicoAplicacao {
    private readonly _tipoPedidoRepositorio = new TipoPedidoRepositorio();
    
    async executar() {
        const opcoesBusca: any = { camposRetorno: ['id', 'descricao', 'ativo'] };
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        const tiposPedido = await this._tipoPedidoRepositorio.retornarColecaoEntidade(opcoesBusca);
        
        return this.retornoSucesso(tiposPedido);
    }
}