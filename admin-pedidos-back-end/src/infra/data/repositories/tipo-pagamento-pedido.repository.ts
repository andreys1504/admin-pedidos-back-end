import { RepositoryBase } from "../../../core/infra/data/repository";
import { TipoPagamentoPedido } from "../../../domain/entities";

export class TipoPagamentoRepository extends RepositoryBase<TipoPagamentoPedido> {
    constructor() {
        super(TipoPagamentoPedido.name);
    }
}