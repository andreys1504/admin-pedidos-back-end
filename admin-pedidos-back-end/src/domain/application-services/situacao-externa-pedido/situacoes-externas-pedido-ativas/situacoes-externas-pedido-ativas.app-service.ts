import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { SituacaoExternaPedidoRepositorio } from "../../../../infra/data/repositories/situacao-externa-pedido.repositorio";

export class SituacoesExternasPedidoAtivasAppService extends AppService {
    private readonly situacaoExternaRepositorio = new SituacaoExternaPedidoRepositorio();
    
    async executar() {
        const opcoesBusca: any = {};
        opcoesBusca.camposRetorno = ['id', 'descricao'];
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        opcoesBusca.filtro = { ativo: true };

        const situacoesExternasPedido = await this.situacaoExternaRepositorio.retornarColecaoEntidade(opcoesBusca);
        return this.retornoSucesso(situacoesExternasPedido);
    }
}
