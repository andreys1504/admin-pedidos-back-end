import { RepositoryBase } from "../repository";
import { TipoPedido } from "../../../domain/entities";

export class TipoPedidoRepository extends RepositoryBase<TipoPedido> {
    constructor() {
        super(TipoPedido.name);
    }
}