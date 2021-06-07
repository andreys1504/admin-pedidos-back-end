import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { AutenticacaoViewModelServicoApp } from "./autenticacao.view-model.servico-app";
import { ValidacaoDados } from "../../../../../0-core/helpers";
import { autenticacaoUsuarioAdminServico } from '../../../../../1-infra/servicos/autenticacao-usuario/autenticacao-usuario-admin/autenticacao-usuario-admin.servico';
import { ConfiguracoesGlobaisApp } from "../../../../../0-core/configuracoes-aplicacoes/configuracoes-globais.app";
import { UsuarioAdmin } from "../../../../entidades";
import { UsuarioAdminRepositorio } from "../../../../repositorios/usuario-admin.repositorio";

export class AutenticacaoServicoApp extends ServicoAplicacao {
    private readonly _validacaoDados = new ValidacaoDados();
    private readonly _usuarioAdminRepositorio = new UsuarioAdminRepositorio();

    async executar(model: AutenticacaoViewModelServicoApp) {
        this._validacaoDados.obrigatorio(model.nomeUsuario, 'Login não informado');
        this._validacaoDados.tamanhoMaximo(model.nomeUsuario, 20, 'Usuário ou senha inválidos');
        this._validacaoDados.obrigatorio(model.senha, 'SENHA não informada');
        this._validacaoDados.tamanhoMaximo(model.senha, 20, 'Usuário ou senha inválidos');

        if (!this._validacaoDados.valido())
            return this.retornoErro(this._validacaoDados.recuperarErros());

        const usuario = await this._usuarioAdminRepositorio.autenticar({
            nomeUsuario: model.nomeUsuario,
            senha: UsuarioAdmin.gerarSenha(model.senha)
        });

        if (!usuario)
            return this.retornoErro([{ mensagem: 'LOGIN ou SENHA inválidos' }]);

        if (!usuario.ativo)
            return this.retornoErro([{ mensagem: 'Usuário desativado' }]);

        let chavesPermissoes = [];
        if (usuario.permissoesAcesso && usuario.permissoesAcesso.length > 0)
            chavesPermissoes = usuario.permissoesAcesso.map((permissaoAcesso: any) => permissaoAcesso.chave);

        const dadosUsuarioRetorno = {
            idUsuario: usuario.id,
            nomeUsuario: usuario.nomeUsuario,
            permissoes: chavesPermissoes,
            necessarioAlteracaoSenha: usuario.necessarioAlteracaoSenha
        }

        const token = autenticacaoUsuarioAdminServico
            .gerarToken(
                Object.assign({}, dadosUsuarioRetorno),
                ConfiguracoesGlobaisApp.APIS_SALT_KEY);

        return this.retornoSucesso(Object.assign(
            {
                token: token,
                nome: usuario.nome
            },
            dadosUsuarioRetorno));
    }
}