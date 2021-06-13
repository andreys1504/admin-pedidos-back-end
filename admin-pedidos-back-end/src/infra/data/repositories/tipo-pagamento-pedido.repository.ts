import { RepositoryBase } from '../repository';
import { TipoPagamentoPedido } from '../../../domain/entities';

export class TipoPagamentoRepository extends RepositoryBase<TipoPagamentoPedido> {
    constructor() {
        super(TipoPagamentoPedido.name);
    }
}