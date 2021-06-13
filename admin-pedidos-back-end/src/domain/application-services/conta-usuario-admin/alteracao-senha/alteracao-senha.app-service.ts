import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { UsuarioAdminRepository } from "../../../../infra/data/repositories/usuario-admin.repository";
import { UsuarioAdmin } from "../../../entities";
import { AlteracaoSenhaRequest } from "./alteracao-senha.request";

export class AlteracaoSenhaAppService extends AppService<any> {
  private readonly usuarioAdminRepository = new UsuarioAdminRepository();

  async handleAsync(request: AlteracaoSenhaRequest) {
    if (request.validate() === false) {
      return this.returnNotifications(request.getNotifications);
    }

    let opcoesBuscaUsuario: any = {};
    opcoesBuscaUsuario.filtro = {
      nomeUsuario: request.requestModel.nomeUsuario,
      senha: UsuarioAdmin.gerarSenha(request.requestModel.senhaAtual),
    };

    const usuarioEdicao = await this.usuarioAdminRepository.entidadeAsync(
      opcoesBuscaUsuario
    );
    if (!usuarioEdicao) {
      return this.returnNotification("senhaAtual", "SENHA ATUAL inválida");
    }

    usuarioEdicao.alterarSenha(request.requestModel.confirmacaoNovaSenha);
    await this.usuarioAdminRepository.salvarAsync(usuarioEdicao);

    return this.returnSuccess();
  }
}
