import { RepositoryBase } from '../repository';
import { SituacaoInternaItemPedido } from '../../../domain/entities';

export class SituacaoInternaItemPedidoRepository extends RepositoryBase<SituacaoInternaItemPedido> {
    constructor() {
        super(SituacaoInternaItemPedido.name);
    }
}