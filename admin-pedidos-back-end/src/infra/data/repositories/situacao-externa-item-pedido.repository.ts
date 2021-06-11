import { RepositoryBase } from "../../../core/infra/data/repository";
import { SituacaoExternaItemPedido } from "../../../domain/entities";

export class SituacaoExternaItemPedidoRepository extends RepositoryBase<SituacaoExternaItemPedido> {
    constructor() {
        super(SituacaoExternaItemPedido.name);
    }
}