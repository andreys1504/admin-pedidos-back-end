import { RepositoryBase } from "../../../core/infra/data/repository";
import { SituacaoInternaItemPedido } from "../../../domain/entities";

export class SituacaoInternaItemPedidoRepositorio extends RepositoryBase<SituacaoInternaItemPedido> {
    constructor() {
        super(SituacaoInternaItemPedido.name);
    }
}