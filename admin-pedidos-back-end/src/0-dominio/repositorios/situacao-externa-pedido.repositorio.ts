import { SituacaoExternaPedido } from '../entidades/situacao-externa-pedido';
import { Repositorio } from '../../0-core/dominio/repositorios/repositorio';

export class SituacaoExternaPedidoRepositorio extends Repositorio<SituacaoExternaPedido> {
    constructor() {
        super(SituacaoExternaPedido.name);
    }
}