import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { SituacaoExternaItemPedidoRepositorio } from "../../../../repositorios/situacao-externa-item-pedido.repositorio";

export class SituacoesExternasItemPedidoServicoApp extends ServicoAplicacao {
    private readonly situacaoExternaItemRepositorio = new SituacaoExternaItemPedidoRepositorio();

    async executar() {
        const opcoesBusca: any = { camposRetorno: ['id', 'descricao', 'ativo'] };
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        const situacoesExternasItem = await this.situacaoExternaItemRepositorio.retornarColecaoEntidade(opcoesBusca);

        return this.retornoSucesso(situacoesExternasItem);
    }
}