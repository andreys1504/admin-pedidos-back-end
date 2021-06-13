import { tokenService } from "../../../../apis/api-admin/configurations/routes/security/token-service";
import { GlobalSettings } from "../../../../core/configurations/global-settings";
import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { UsuarioAdminRepository } from "../../../../infra/data/repositories/usuario-admin.repository";
import { UsuarioAdmin } from "../../../entities";
import { AutenticacaoRequest } from "./autenticacao.request";

export class AutenticacaoAppService extends AppService<any> {
  private readonly usuarioAdminRepository = new UsuarioAdminRepository();

  async handleAsync(request: AutenticacaoRequest) {
    if (request.validate() === false) {
      return this.returnNotifications(request.getNotifications);
    }

    const usuario = await this.usuarioAdminRepository.autenticar({
      nomeUsuario: request.requestModel.nomeUsuario,
      senha: UsuarioAdmin.gerarSenha(request.requestModel.senha),
    });

    if (!usuario) {
      return this.returnNotification("nomeUsuario", "LOGIN ou SENHA inválidos");
    }

    if (!usuario.ativo) {
      return this.returnNotification("nomeUsuario", "Usuário desativado");
    }

    let chavesPermissoes = [];
    if (usuario.permissoesAcesso && usuario.permissoesAcesso.length > 0) {
      chavesPermissoes = usuario.permissoesAcesso.map(
        (permissaoAcesso: any) => permissaoAcesso.chave
      );
    }

    const dadosUsuarioRetorno = {
      idUsuario: usuario.id,
      nomeUsuario: usuario.nomeUsuario,
      permissoes: chavesPermissoes,
      necessarioAlteracaoSenha: usuario.necessarioAlteracaoSenha,
    };

    const token = tokenService.generateToken(
      Object.assign({}, dadosUsuarioRetorno),
      GlobalSettings.APIS_SALT_KEY
    );

    return this.returnData(
      Object.assign(
        {
          token: token,
          nome: usuario.nome,
        },
        dadosUsuarioRetorno
      )
    );
  }
}
