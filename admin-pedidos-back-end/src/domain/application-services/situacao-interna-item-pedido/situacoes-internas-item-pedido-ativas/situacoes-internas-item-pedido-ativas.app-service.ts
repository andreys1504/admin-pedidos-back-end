import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { SituacaoInternaItemPedidoRepository } from "../../../../infra/data/repositories/situacao-interna-item-pedido.repository";

export class SituacoesInternasItemPedidoAtivasAppService extends AppService {
    private readonly situacaoInternaItemRepository = new SituacaoInternaItemPedidoRepository();
    
    async handle() {
        const opcoesBusca: any = {};
        opcoesBusca.camposRetorno = ['id', 'descricao'];
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        opcoesBusca.filtro = { ativo: true };
        
        const situacoesInternasItem = await this.situacaoInternaItemRepository.retornarColecaoEntidade(opcoesBusca);
        return this.returnSuccess(situacoesInternasItem);
    }
}
