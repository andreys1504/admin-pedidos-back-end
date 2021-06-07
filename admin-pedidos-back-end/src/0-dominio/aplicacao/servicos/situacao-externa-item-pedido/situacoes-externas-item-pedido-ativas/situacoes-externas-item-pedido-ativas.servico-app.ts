import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { SituacaoExternaItemPedidoRepositorio } from "../../../../repositorios/situacao-externa-item-pedido.repositorio";

export class SituacoesExternasItemPedidoAtivasServicoApp extends ServicoAplicacao {
    private readonly _situacaoExternaItemRepositorio = new SituacaoExternaItemPedidoRepositorio();

    async executar() {
        let opcoesBusca: any = {};
        opcoesBusca.camposRetorno = ['id', 'descricao'];
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        opcoesBusca.filtro = { ativo: true };

        const situacoesExternasItem = await this._situacaoExternaItemRepositorio.retornarColecaoEntidade(opcoesBusca);
        return this.retornoSucesso(situacoesExternasItem);
    }
}