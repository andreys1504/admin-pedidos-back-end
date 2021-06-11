import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { SituacaoExternaItemPedidoRepository } from "../../../../infra/data/repositories/situacao-externa-item-pedido.repository";

export class SituacoesExternasItemPedidoAppService extends AppService {
    private readonly situacaoExternaItemRepository = new SituacaoExternaItemPedidoRepository();

    async handle() {
        const opcoesBusca: any = { camposRetorno: ['id', 'descricao', 'ativo'] };
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        const situacoesExternasItem = await this.situacaoExternaItemRepository.retornarColecaoEntidade(opcoesBusca);

        return this.returnSuccess(situacoesExternasItem);
    }
}
