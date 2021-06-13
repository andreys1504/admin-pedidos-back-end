import { AppService } from '../../../../core/domain/application-services/service/app-service';
import { DomainException } from '../../../../core/domain/exceptions/domain.exception';
import { UsuarioAdminRepository } from '../../../../infra/data/repositories/usuario-admin.repository';
import { AtivacaoUsuarioAdminRequest } from './ativacao-usuario-admin.request';

export class AtivacaoUsuarioAdminAppService extends AppService<any> {
  private readonly usuarioAdminRepository = new UsuarioAdminRepository();

  async handleAsync(request: AtivacaoUsuarioAdminRequest) {
    if (request.validate() === false) {
      return this.returnNotifications(request.getNotifications);
    }

    const opcoesBuscaPorId: any = {};
    opcoesBuscaPorId.filtro = { id: request.requestModel.idUsuarioASerAtivado };
    const usuarioEdicao = await this.usuarioAdminRepository.entidadeAsync(
      opcoesBuscaPorId
    );
    if (!usuarioEdicao) {
      throw new DomainException('operação inválida');
    }

    usuarioEdicao.ativar();
    await this.usuarioAdminRepository.salvarAsync(usuarioEdicao);

    return this.returnSuccess();
  }
}
