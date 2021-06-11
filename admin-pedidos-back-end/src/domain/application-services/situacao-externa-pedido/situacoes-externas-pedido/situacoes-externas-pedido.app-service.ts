import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { SituacaoExternaPedidoRepositorio } from "../../../../infra/data/repositories/situacao-externa-pedido.repositorio";

export class SituacoesExternasPedidoAppService extends AppService {
    private readonly situacaoExternaRepositorio = new SituacaoExternaPedidoRepositorio();
    
    async executar() {
        const opcoesBusca: any = { camposRetorno: ['id', 'descricao', 'ativo'] };
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        const situacoesExternasPedido = await this.situacaoExternaRepositorio.retornarColecaoEntidade(opcoesBusca);

        return this.retornoSucesso(situacoesExternasPedido);
    }
}
