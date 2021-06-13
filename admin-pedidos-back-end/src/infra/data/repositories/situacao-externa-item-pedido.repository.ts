import { RepositoryBase } from "../repository";
import { SituacaoExternaItemPedido } from "../../../domain/entities";

export class SituacaoExternaItemPedidoRepository extends RepositoryBase<SituacaoExternaItemPedido> {
    constructor() {
        super(SituacaoExternaItemPedido.name);
    }
}