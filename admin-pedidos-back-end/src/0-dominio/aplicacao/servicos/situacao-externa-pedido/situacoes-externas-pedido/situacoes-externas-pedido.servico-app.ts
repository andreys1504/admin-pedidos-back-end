import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { SituacaoExternaPedidoRepositorio } from "../../../../repositorios/situacao-externa-pedido.repositorio";

export class SituacoesExternasPedidoServicoApp extends ServicoAplicacao {
    private readonly _situacaoExternaRepositorio = new SituacaoExternaPedidoRepositorio();
    
    async executar() {
        const opcoesBusca: any = { camposRetorno: ['id', 'descricao', 'ativo'] };
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        const situacoesExternasPedido = await this._situacaoExternaRepositorio.retornarColecaoEntidade(opcoesBusca);

        return this.retornoSucesso(situacoesExternasPedido);
    }
}