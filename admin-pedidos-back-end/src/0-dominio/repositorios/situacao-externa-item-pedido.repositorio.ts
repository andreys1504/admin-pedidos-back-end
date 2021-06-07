import { SituacaoExternaItemPedido } from '../entidades/situacao-externa-item-pedido';
import { Repositorio } from '../../0-core/dominio/repositorios/repositorio';

export class SituacaoExternaItemPedidoRepositorio extends Repositorio<SituacaoExternaItemPedido> {
    constructor() {
        super(SituacaoExternaItemPedido.name);
    }
}