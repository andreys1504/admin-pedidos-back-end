import { RepositoryBase } from '../repository';
import { TipoCliente } from '../../../domain/entities';

export class TipoClienteRepository extends RepositoryBase<TipoCliente> {
    constructor() {
        super(TipoCliente.name);
    }
}