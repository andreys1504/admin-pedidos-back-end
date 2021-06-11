import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { UsuarioAdminRepositorio } from "../../../../infra/data/repositories/usuario-admin.repositorio";

export class UsuariosCadastradosAppService extends AppService {
    private readonly usuarioAdminRepositorio = new UsuarioAdminRepositorio();

    async executar() {
        const usuarios = await this.usuarioAdminRepositorio.usuarios();
        return this.retornoSucesso(usuarios);
    }
}
