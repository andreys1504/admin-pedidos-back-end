import { AppService } from '../../../../core/domain/application-services/service/app-service';
import { SituacaoInternaItemPedidoRepository } from '../../../../infra/data/repositories/situacao-interna-item-pedido.repository';
import { SituacaoInternaItemPedido } from '../../../entities';

export class SituacoesInternasItemPedidoAtivasAppService extends AppService<
  SituacaoInternaItemPedido[]
> {
  private readonly situacaoInternaItemRepository =
    new SituacaoInternaItemPedidoRepository();

  async handleAsync() {
    const opcoesBusca: any = {};
    opcoesBusca.camposRetorno = ['id', 'descricao'];
    opcoesBusca.ordenacao = { descricao: 'ASC' };
    opcoesBusca.filtro = { ativo: true };

    const situacoesInternasItem =
      await this.situacaoInternaItemRepository.entidadesAsync(
        opcoesBusca
      );
    return this.returnData(situacoesInternasItem);
  }
}
