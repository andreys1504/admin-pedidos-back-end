import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { SituacaoExternaPedidoRepository } from "../../../../infra/data/repositories/situacao-externa-pedido.repository";

export class SituacoesExternasPedidoAppService extends AppService {
    private readonly situacaoExternaRepository = new SituacaoExternaPedidoRepository();
    
    async handle() {
        const opcoesBusca: any = { camposRetorno: ['id', 'descricao', 'ativo'] };
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        const situacoesExternasPedido = await this.situacaoExternaRepository.retornarColecaoEntidade(opcoesBusca);

        return this.returnSuccess(situacoesExternasPedido);
    }
}
