import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { PermissaoAcessoRepository } from "../../../../infra/data/repositories/permissao-acesso.repository";
import { UsuarioAdminRepository } from "../../../../infra/data/repositories/usuario-admin.repository";
import { PermissaoAcesso, UsuarioAdmin } from "../../../entities";
import { EdicaoUsuarioAdminRequest } from "./edicao-usuario-admin.request";

export class EdicaoUsuarioAdminAppService extends AppService<UsuarioAdmin> {
  private readonly permissaoAcessoRepository = new PermissaoAcessoRepository();
  private readonly usuarioAdminRepository = new UsuarioAdminRepository();

  async handleAsync(request: EdicaoUsuarioAdminRequest) {
    if (request.validate() === false) {
      return this.returnNotifications(request.getNotifications);
    }

    const senhaEditada = request.requestModel.senhaEditada;
    const dadosEdicao = request.requestModel;

    const dadosUsuarioAtual =
      await this.usuarioAdminRepository.entidadeAsync({
        filtro: { id: dadosEdicao.usuario.idUsuario },
      } as any);

    if (!dadosUsuarioAtual) {
      throw new Error("usuário inexistente");
    }

    if (dadosUsuarioAtual.nomeUsuario !== dadosEdicao.usuario.nomeUsuario) {
      const opcoesBuscaPorNomeUsuario: any = {};
      opcoesBuscaPorNomeUsuario.filtro = {
        nomeUsuario: dadosEdicao.usuario.nomeUsuario,
      };
      if (
        (await this.usuarioAdminRepository.entidadeAsync(
          opcoesBuscaPorNomeUsuario
        )) != null
      ) {
        return this.returnNotification(
          "nomeUsuario",
          "NOME DE USUÁRIO já existente no sistema"
        );
      }
    }

    let permissoesAcesso = new Array<PermissaoAcesso>();
    if (
      dadosEdicao.usuario.permissoes &&
      dadosEdicao.usuario.permissoes.length > 0
    ) {
      for (let i = 0; i < dadosEdicao.usuario.permissoes.length; i++) {
        const opcoesBusca: any = {};
        opcoesBusca.filtro = { chave: dadosEdicao.usuario.permissoes[i] };
        const permissaoAcesso =
          await this.permissaoAcessoRepository.entidadeAsync(opcoesBusca);
        if (!permissaoAcesso) {
          throw new Error("Permissão inexistente");
        }

        permissoesAcesso.push(permissaoAcesso);
      }
    }

    dadosUsuarioAtual.editar({
      nomeUsuario: dadosEdicao.usuario.nomeUsuario,
      senhaEditada: senhaEditada,
      senha: dadosEdicao.usuario.senha,
      nome: dadosEdicao.usuario.nome,
      permissoesAcesso: permissoesAcesso,
    });

    await this.usuarioAdminRepository.salvarAsync(dadosUsuarioAtual);
    dadosUsuarioAtual.senha = "";

    return this.returnData(dadosUsuarioAtual);
  }
}
