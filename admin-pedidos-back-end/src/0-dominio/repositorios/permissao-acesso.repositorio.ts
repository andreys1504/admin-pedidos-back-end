import { PermissaoAcesso } from '../entidades/permissao-acesso';
import { Repositorio } from '../../0-core/dominio/repositorios/repositorio';

export class PermissaoAcessoRepositorio extends Repositorio<PermissaoAcesso> {
    constructor() {
        super(PermissaoAcesso.name);
    }
}