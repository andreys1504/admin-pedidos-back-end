import { AppService } from '../../../../core/domain/application-services/service/app-service';
import { DomainException } from '../../../../core/domain/exceptions/domain.exception';
import { UsuarioAdminRepository } from '../../../../infra/data/repositories/usuario-admin.repository';
import { DesativacaoUsuarioAdminRequest } from './desativacao-usuario-admin.request';

export class DesativacaoUsuarioAdminAppService extends AppService<any> {
  private readonly usuarioAdminRepository = new UsuarioAdminRepository();

  async handleAsync(request: DesativacaoUsuarioAdminRequest) {
    if (request.validate() === false) {
      return this.returnNotifications(request.getNotifications);
    }

    const opcoesBuscaPorId: any = {};
    opcoesBuscaPorId.filtro = {
      id: request.requestModel.idUsuarioASerDesativado,
    };
    const usuarioEdicao = await this.usuarioAdminRepository.entidadeAsync(
      opcoesBuscaPorId
    );
    if (!usuarioEdicao) {
      throw new DomainException('operação inválida');
    }

    usuarioEdicao.desativar();
    await this.usuarioAdminRepository.salvarAsync(usuarioEdicao);

    return this.returnSuccess();
  }
}
