import { RepositoryBase } from "../../../core/infra/data/repository";
import { TipoPagamentoPedido } from "../../../domain/entities";

export class TipoPagamentoRepositorio extends RepositoryBase<TipoPagamentoPedido> {
    constructor() {
        super(TipoPagamentoPedido.name);
    }
}