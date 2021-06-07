import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao"
import { UsuarioAdminRepositorio } from "../../../../repositorios/usuario-admin.repositorio";

export class UsuariosCadastradosServicoApp extends ServicoAplicacao {
    private readonly _usuarioAdminRepositorio = new UsuarioAdminRepositorio();

    async executar() {
        const usuarios = await this._usuarioAdminRepositorio.usuarios();
        return this.retornoSucesso(usuarios);
    }
}