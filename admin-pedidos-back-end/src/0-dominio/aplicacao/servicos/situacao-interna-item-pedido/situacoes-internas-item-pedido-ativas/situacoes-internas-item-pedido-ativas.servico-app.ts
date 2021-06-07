import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { SituacaoInternaItemPedidoRepositorio } from "../../../../repositorios/situacao-interna-item-pedido.repositorio";

export class SituacoesInternasItemPedidoAtivasServicoApp extends ServicoAplicacao {
    private readonly _situacaoInternaItemRepositorio = new SituacaoInternaItemPedidoRepositorio();
    
    async executar() {
        const opcoesBusca: any = {};
        opcoesBusca.camposRetorno = ['id', 'descricao'];
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        opcoesBusca.filtro = { ativo: true };
        
        const situacoesInternasItem = await this._situacaoInternaItemRepositorio.retornarColecaoEntidade(opcoesBusca);
        return this.retornoSucesso(situacoesInternasItem);
    }
}