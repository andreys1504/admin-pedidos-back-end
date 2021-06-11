import { RepositoryBase } from "../../../core/infra/data/repository";
import { SituacaoExternaPedido } from "../../../domain/entities";

export class SituacaoExternaPedidoRepositorio extends RepositoryBase<SituacaoExternaPedido> {
    constructor() {
        super(SituacaoExternaPedido.name);
    }
}