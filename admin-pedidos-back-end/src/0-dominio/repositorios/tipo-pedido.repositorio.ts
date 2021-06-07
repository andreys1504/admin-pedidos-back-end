import { TipoPedido } from '../entidades/tipo-pedido';
import { Repositorio } from '../../0-core/dominio/repositorios/repositorio';

export class TipoPedidoRepositorio extends Repositorio<TipoPedido> {
    constructor() {
        super(TipoPedido.name);
    }
}