import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { TipoPedidoRepositorio } from "../../../../repositorios/tipo-pedido.repositorio";

export class TiposPedidoAtivosServico extends ServicoAplicacao {
    private readonly _tipoPedidoRepositorio = new TipoPedidoRepositorio();
    
    async executar() {
        const opcoesBusca: any = {};
        opcoesBusca.camposRetorno = ['id', 'descricao'];
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        opcoesBusca.filtro = { ativo: true };

        const tiposPedido = await this._tipoPedidoRepositorio.retornarColecaoEntidade(opcoesBusca);
        return this.retornoSucesso(tiposPedido);
    }
}