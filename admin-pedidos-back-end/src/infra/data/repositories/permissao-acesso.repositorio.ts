import { RepositoryBase } from "../../../core/infra/data/repository";
import { PermissaoAcesso } from "../../../domain/entities";

export class PermissaoAcessoRepositorio extends RepositoryBase<PermissaoAcesso> {
    constructor() {
        super(PermissaoAcesso.name);
    }
}