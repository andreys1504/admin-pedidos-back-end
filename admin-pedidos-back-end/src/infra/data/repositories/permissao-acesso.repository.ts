import { RepositoryBase } from "../repository";
import { PermissaoAcesso } from "../../../domain/entities";

export class PermissaoAcessoRepository extends RepositoryBase<PermissaoAcesso> {
    constructor() {
        super(PermissaoAcesso.name);
    }
}