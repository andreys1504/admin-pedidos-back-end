import { AppService } from '../../../../core/domain/application-services/service/app-service';
import { DomainException } from '../../../../core/domain/exceptions/domain.exception';
import { PermissaoAcessoRepository } from '../../../../infra/data/repositories/permissao-acesso.repository';
import { UsuarioAdminRepository } from '../../../../infra/data/repositories/usuario-admin.repository';
import {
  gerarSenhaCodificada,
  PermissaoAcesso,
  UsuarioAdmin,
} from '../../../entities';
import { CadastroUsuarioAdminRequest } from './cadastro-usuario-admin.request';

export class CadastroUsuarioAdminAppService extends AppService<UsuarioAdmin> {
  private readonly permissaoAcessoRepository = new PermissaoAcessoRepository();
  private readonly usuarioAdminRepository = new UsuarioAdminRepository();

  async handleAsync(request: CadastroUsuarioAdminRequest) {
    if (request.validate() === false) {
      return this.returnNotifications(request.getNotifications);
    }

    if (
      (await this.usuarioAdminRepository.existenciaUsuarioPorNomeUsuario(
        request.requestModel.nomeUsuario
      )) === true
    ) {
      return this.returnNotification(
        'nomeUsuario',
        'NOME DE USUÁRIO já existente no sistema'
      );
    }

    let permissoesAcesso = new Array<PermissaoAcesso>();
    if (
      request.requestModel.permissoes &&
      request.requestModel.permissoes.length > 0
    ) {
      for (let i = 0; i < request.requestModel.permissoes.length; i++) {
        const opcoesBusca: any = {};
        opcoesBusca.filtro = { chave: request.requestModel.permissoes[i] };
        const permissaoAcesso =
          await this.permissaoAcessoRepository.entidadeAsync(opcoesBusca);
        if (!permissaoAcesso) {
          throw new DomainException('Permissão inexistente');
        }

        permissoesAcesso.push(permissaoAcesso);
      }
    }

    const usuarioCadastro = new UsuarioAdmin();
    usuarioCadastro.novoUsuario({
      nomeUsuario: request.requestModel.nomeUsuario,
      senha: gerarSenhaCodificada(request.requestModel.senha),
      nome: request.requestModel.nome,
      permissoesAcesso,
    });

    await this.usuarioAdminRepository.salvarAsync(usuarioCadastro);
    return this.returnData(usuarioCadastro);
  }
}
