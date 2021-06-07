import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { TipoPagamentoRepositorio } from "../../../../repositorios/tipo-pagamento-pedido.repositorio";

export class TiposPagamentoServicoApp extends ServicoAplicacao {
    private readonly _tipoPagamentoRepositorio = new TipoPagamentoRepositorio();

    async executar() {
        const opcoesBusca: any = { camposRetorno: ['id', 'descricao', 'ativo'] };
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        const tiposPagamento = await this._tipoPagamentoRepositorio.retornarColecaoEntidade(opcoesBusca);
        
        return this.retornoSucesso(tiposPagamento);
    }
}