import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { SituacaoExternaPedidoRepository } from "../../../../infra/data/repositories/situacao-externa-pedido.repository";

export class SituacoesExternasPedidoAtivasAppService extends AppService {
    private readonly situacaoExternaRepository = new SituacaoExternaPedidoRepository();
    
    async handle() {
        const opcoesBusca: any = {};
        opcoesBusca.camposRetorno = ['id', 'descricao'];
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        opcoesBusca.filtro = { ativo: true };

        const situacoesExternasPedido = await this.situacaoExternaRepository.retornarColecaoEntidade(opcoesBusca);
        return this.returnSuccess(situacoesExternasPedido);
    }
}
