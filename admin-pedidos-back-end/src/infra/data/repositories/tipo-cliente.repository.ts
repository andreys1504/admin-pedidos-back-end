import { RepositoryBase } from "../../../core/infra/data/repository";
import { TipoCliente } from "../../../domain/entities";

export class TipoClienteRepository extends RepositoryBase<TipoCliente> {
    constructor() {
        super(TipoCliente.name);
    }
}