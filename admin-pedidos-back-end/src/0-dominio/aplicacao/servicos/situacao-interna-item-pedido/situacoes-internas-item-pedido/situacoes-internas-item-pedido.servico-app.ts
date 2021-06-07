import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { SituacaoInternaItemPedidoRepositorio } from "../../../../repositorios/situacao-interna-item-pedido.repositorio";

export class SituacoesInternasItemPedidoServicoApp extends ServicoAplicacao{
    private readonly _situacaoInternaItemRepositorio = new SituacaoInternaItemPedidoRepositorio();

    async executar() {
        const opcoesBusca: any = { camposRetorno: ['id', 'descricao', 'ativo'] };
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        const situacoesInternasItem = await this._situacaoInternaItemRepositorio.retornarColecaoEntidade(opcoesBusca);

        return this.retornoSucesso(situacoesInternasItem);
    }
}