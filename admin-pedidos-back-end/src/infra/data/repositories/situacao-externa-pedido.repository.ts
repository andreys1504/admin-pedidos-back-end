import { RepositoryBase } from '../repository';
import { SituacaoExternaPedido } from '../../../domain/entities';

export class SituacaoExternaPedidoRepository extends RepositoryBase<SituacaoExternaPedido> {
    constructor() {
        super(SituacaoExternaPedido.name);
    }
}