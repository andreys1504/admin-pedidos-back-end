import { RepositoryBase } from "../../../core/infra/data/repository";
import { TipoPedido } from "../../../domain/entities";

export class TipoPedidoRepositorio extends RepositoryBase<TipoPedido> {
    constructor() {
        super(TipoPedido.name);
    }
}