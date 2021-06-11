import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { SituacaoExternaItemPedidoRepository } from "../../../../infra/data/repositories/situacao-externa-item-pedido.repository";

export class SituacoesExternasItemPedidoAtivasAppService extends AppService {
    private readonly situacaoExternaItemRepository = new SituacaoExternaItemPedidoRepository();

    async handle() {
        let opcoesBusca: any = {};
        opcoesBusca.camposRetorno = ['id', 'descricao'];
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        opcoesBusca.filtro = { ativo: true };

        const situacoesExternasItem = await this.situacaoExternaItemRepository.retornarColecaoEntidade(opcoesBusca);
        return this.returnSuccess(situacoesExternasItem);
    }
}
