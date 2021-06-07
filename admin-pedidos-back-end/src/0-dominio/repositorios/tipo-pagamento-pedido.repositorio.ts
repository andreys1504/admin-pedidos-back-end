import { TipoPagamentoPedido } from '../entidades/tipo-pagamento-pedido';
import { Repositorio } from '../../0-core/dominio/repositorios/repositorio';

export class TipoPagamentoRepositorio extends Repositorio<TipoPagamentoPedido> {
    constructor() {
        super(TipoPagamentoPedido.name);
    }
}