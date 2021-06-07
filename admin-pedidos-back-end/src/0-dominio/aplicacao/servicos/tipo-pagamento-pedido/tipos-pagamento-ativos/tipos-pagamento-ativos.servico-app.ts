import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { TipoPagamentoRepositorio } from "../../../../repositorios/tipo-pagamento-pedido.repositorio";

export class TiposPagamentoAtivosServicoApp extends ServicoAplicacao {
    private readonly _tipoPagamentoRepositorio = new TipoPagamentoRepositorio();
    
    async executar() {
        const opcoesBusca: any = {};
        opcoesBusca.camposRetorno = ['id', 'descricao'];
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        opcoesBusca.filtro = { ativo: true };

        const tiposPagamamentos = await this._tipoPagamentoRepositorio.retornarColecaoEntidade(opcoesBusca);
        return this.retornoSucesso(tiposPagamamentos);
    }
}