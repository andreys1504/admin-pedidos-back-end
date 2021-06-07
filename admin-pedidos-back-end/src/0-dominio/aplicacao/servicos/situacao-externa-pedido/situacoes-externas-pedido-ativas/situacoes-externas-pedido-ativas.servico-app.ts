import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { SituacaoExternaPedidoRepositorio } from "../../../../repositorios/situacao-externa-pedido.repositorio";

export class SituacoesExternasPedidoAtivasServicoApp extends ServicoAplicacao {
    private readonly _situacaoExternaRepositorio = new SituacaoExternaPedidoRepositorio();
    
    async executar() {
        const opcoesBusca: any = {};
        opcoesBusca.camposRetorno = ['id', 'descricao'];
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        opcoesBusca.filtro = { ativo: true };

        const situacoesExternasPedido = await this._situacaoExternaRepositorio.retornarColecaoEntidade(opcoesBusca);
        return this.retornoSucesso(situacoesExternasPedido);
    }
}