import { RepositoryBase } from "../../../core/infra/data/repository";
import { TipoCliente } from "../../../domain/entities";

export class TipoClienteRepositorio extends RepositoryBase<TipoCliente> {
    constructor() {
        super(TipoCliente.name);
    }
}