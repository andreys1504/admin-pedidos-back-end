import { tokenService } from "../../../../apis/api-admin/configurations/routes/security/token-service";
import { GlobalSettings } from "../../../../core/configurations/global-settings";
import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ValidacaoDados } from "../../../../core/helpers";
import { UsuarioAdminRepository } from "../../../../infra/data/repositories/usuario-admin.repository";
import { UsuarioAdmin } from "../../../entities";
import { AutenticacaoRequest } from "./autenticacao.request";

export class AutenticacaoAppService extends AppService {
    private readonly validacaoDados = new ValidacaoDados();
    private readonly usuarioAdminRepository = new UsuarioAdminRepository();

    async handle(model: AutenticacaoRequest) {
        this.validacaoDados.obrigatorio(model.nomeUsuario, 'Login não informado');
        this.validacaoDados.tamanhoMaximo(model.nomeUsuario, 20, 'Usuário ou senha inválidos');
        this.validacaoDados.obrigatorio(model.senha, 'SENHA não informada');
        this.validacaoDados.tamanhoMaximo(model.senha, 20, 'Usuário ou senha inválidos');

        if (!this.validacaoDados.valido())
            return this.returnNotifications(this.validacaoDados.recuperarErros());

        const usuario = await this.usuarioAdminRepository.autenticar({
            nomeUsuario: model.nomeUsuario,
            senha: UsuarioAdmin.gerarSenha(model.senha)
        });

        if (!usuario)
            return this.returnNotifications([{ mensagem: 'LOGIN ou SENHA inválidos' }]);

        if (!usuario.ativo)
            return this.returnNotifications([{ mensagem: 'Usuário desativado' }]);

        let chavesPermissoes = [];
        if (usuario.permissoesAcesso && usuario.permissoesAcesso.length > 0)
            chavesPermissoes = usuario.permissoesAcesso.map((permissaoAcesso: any) => permissaoAcesso.chave);

        const dadosUsuarioRetorno = {
            idUsuario: usuario.id,
            nomeUsuario: usuario.nomeUsuario,
            permissoes: chavesPermissoes,
            necessarioAlteracaoSenha: usuario.necessarioAlteracaoSenha
        }

        const token = tokenService
            .generateToken(
                Object.assign({}, dadosUsuarioRetorno),
                GlobalSettings.APIS_SALT_KEY);

        return this.returnSuccess(Object.assign(
            {
                token: token,
                nome: usuario.nome
            },
            dadosUsuarioRetorno));
    }
}
