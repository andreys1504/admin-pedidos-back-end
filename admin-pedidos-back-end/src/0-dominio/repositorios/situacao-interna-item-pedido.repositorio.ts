import { Repositorio } from '../../0-core/dominio/repositorios/repositorio';
import { SituacaoInternaItemPedido } from '../entidades';

export class SituacaoInternaItemPedidoRepositorio extends Repositorio<SituacaoInternaItemPedido> {
    constructor() {
        super(SituacaoInternaItemPedido.name);
    }
}