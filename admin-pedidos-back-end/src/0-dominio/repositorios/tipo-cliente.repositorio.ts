import { TipoCliente } from '../entidades/tipo-cliente';
import { Repositorio } from '../../0-core/dominio/repositorios/repositorio';

export class TipoClienteRepositorio extends Repositorio<TipoCliente> {
    constructor() {
        super(TipoCliente.name);
    }
}