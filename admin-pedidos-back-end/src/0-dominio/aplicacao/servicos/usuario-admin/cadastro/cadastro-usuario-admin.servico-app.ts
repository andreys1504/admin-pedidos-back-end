import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { CadastroUsuarioAdminViewModelServicoApp } from "./cadastro-usuario-admin.view-model.servico-app";
import { ValidacaoDados } from "../../../../../0-core/helpers";
import { PermissaoAcessoRepositorio } from "../../../../repositorios/permissao-acesso.repositorio";
import { UsuarioAdminRepositorio } from "../../../../repositorios/usuario-admin.repositorio";
import { PermissaoAcesso, UsuarioAdmin } from "../../../../entidades";
import { autenticacaoUsuarioServico } from '../../../../../1-infra/servicos/autenticacao-usuario/autenticacao-usuario.servico';

export class CadastroUsuarioAdminServicoApp extends ServicoAplicacao {
    private readonly _validacaoDados = new ValidacaoDados();
    private readonly _permissaoAcessoRepositorio = new PermissaoAcessoRepositorio();
    private readonly _usuarioAdminRepositorio = new UsuarioAdminRepositorio();

    async executar(model: CadastroUsuarioAdminViewModelServicoApp) {
        const dadosCadastro = this.validarCadastro(model);

        if (!this._validacaoDados.valido())
            return this.retornoErro(this._validacaoDados.recuperarErros());

        if ((await this._usuarioAdminRepositorio.existenciaUsuarioPorNomeUsuario(dadosCadastro.nomeUsuario)) === true)
            return this.retornoErro([{ mensagem: 'NOME DE USUÁRIO já existente no sistema' }]);

        let permissoesAcesso = new Array<PermissaoAcesso>();
        if (dadosCadastro.permissoes && dadosCadastro.permissoes.length > 0) {
            for (let i = 0; i < dadosCadastro.permissoes.length; i++) {
                const opcoesBusca: any = {};
                opcoesBusca.filtro = { chave: dadosCadastro.permissoes[i] };
                const permissaoAcesso = await this._permissaoAcessoRepositorio.retornarEntidade(opcoesBusca);
                if (!permissaoAcesso)
                    throw new Error('Permissão inexistente');

                permissoesAcesso.push(permissaoAcesso);
            }
        }

        const usuarioCadastro = new UsuarioAdmin();
        usuarioCadastro.novoUsuario({
            nomeUsuario: dadosCadastro.nomeUsuario,
            senha: autenticacaoUsuarioServico.gerarSenhaCodificada(dadosCadastro.senha),
            nome: dadosCadastro.nome,
            permissoesAcesso
        });

        await this._usuarioAdminRepositorio.salvarEntidade(usuarioCadastro);
        return this.retornoSucesso(usuarioCadastro);
    }

    private validarCadastro(dadosCadastro: CadastroUsuarioAdminViewModelServicoApp) {
        this._validacaoDados.obrigatorio(dadosCadastro.nome, 'NOME obrigatório');
        this._validacaoDados.tamanhoMinimo(dadosCadastro.nome, 2, 'NOME inválido');
        this._validacaoDados.tamanhoMaximo(dadosCadastro.nome, 45, 'NOME inválido');

        this._validacaoDados.obrigatorio(dadosCadastro.nomeUsuario, 'LOGIN obrigatório');
        this._validacaoDados.tamanhoMinimo(dadosCadastro.nomeUsuario, 3, 'LOGIN deve conter no mínimo 3 caracteres');
        this._validacaoDados.tamanhoMaximo(dadosCadastro.nomeUsuario, 20, 'LOGIN deve conter no máximo 20 caracteres');
        if (!UsuarioAdmin.nomeUsuarioCaracteresValidos(dadosCadastro.nomeUsuario))
            this._validacaoDados.adicionarMensagem('informe um LOGIN sem espaços, acentos e caracteres especiais');

        this._validacaoDados.obrigatorio(dadosCadastro.senha, 'SENHA obrigatória');
        this._validacaoDados.tamanhoMinimo(dadosCadastro.senha, 3, 'SENHA deve conter no mínimo 3 caracteres');
        this._validacaoDados.tamanhoMaximo(dadosCadastro.senha, 20, 'SENHA deve conter no máximo 20 caracteres');

        if (!dadosCadastro.permissoes)
            dadosCadastro.permissoes = [];

        return dadosCadastro;
    }
}