import { AppService } from '../../../../core/domain/application-services/service/app-service';
import { UsuarioAdminRepository } from '../../../../infra/data/repositories/usuario-admin.repository';

export class UsuariosCadastradosAppService extends AppService<any[]> {
  private readonly usuarioAdminRepository = new UsuarioAdminRepository();

  async handleAsync() {
    const usuarios = await this.usuarioAdminRepository.usuarios();
    return this.returnData(usuarios);
  }
}
