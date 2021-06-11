import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { SituacaoInternaItemPedidoRepository } from "../../../../infra/data/repositories/situacao-interna-item-pedido.repository";

export class SituacoesInternasItemPedidoAppService extends AppService{
    private readonly situacaoInternaItemRepository = new SituacaoInternaItemPedidoRepository();

    async handle() {
        const opcoesBusca: any = { camposRetorno: ['id', 'descricao', 'ativo'] };
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        const situacoesInternasItem = await this.situacaoInternaItemRepository.retornarColecaoEntidade(opcoesBusca);

        return this.returnSuccess(situacoesInternasItem);
    }
}
