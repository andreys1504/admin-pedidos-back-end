import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { SituacaoInternaItemPedidoRepositorio } from "../../../../infra/data/repositories/situacao-interna-item-pedido.repositorio";

export class SituacoesInternasItemPedidoAtivasAppService extends AppService {
    private readonly situacaoInternaItemRepositorio = new SituacaoInternaItemPedidoRepositorio();
    
    async executar() {
        const opcoesBusca: any = {};
        opcoesBusca.camposRetorno = ['id', 'descricao'];
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        opcoesBusca.filtro = { ativo: true };
        
        const situacoesInternasItem = await this.situacaoInternaItemRepositorio.retornarColecaoEntidade(opcoesBusca);
        return this.retornoSucesso(situacoesInternasItem);
    }
}
