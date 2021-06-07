import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao"
import { EdicaoUsuarioAdminViewModelServicoApp } from "./edicao-usuario-admin.view-model.servico-app";
import { PermissaoAcessoRepositorio } from "../../../../repositorios/permissao-acesso.repositorio";
import { ValidacaoDados } from "../../../../../0-core/helpers";
import { UsuarioAdminRepositorio } from "../../../../repositorios/usuario-admin.repositorio";
import { PermissaoAcesso } from "../../../../entidades";

export class EdicaoUsuarioAdminServicoApp extends ServicoAplicacao {
    private readonly _permissaoAcessoRepositorio = new PermissaoAcessoRepositorio();
    private readonly _validacaoDados = new ValidacaoDados();
    private readonly _usuarioAdminRepositorio = new UsuarioAdminRepositorio();

    async executar(model: EdicaoUsuarioAdminViewModelServicoApp) {
        const dadosValidados = this.validarEdicao(model);

        const senhaEditada = dadosValidados.senhaEditada;
        const dadosEdicao = dadosValidados;

        if (!this._validacaoDados.valido())
            return this.retornoErro(this._validacaoDados.recuperarErros());

        const dadosUsuarioAtual =
            await this._usuarioAdminRepositorio.retornarEntidade({ filtro: { id: dadosEdicao.usuario.idUsuario } } as any);

        if (!dadosUsuarioAtual)
            throw new Error("usuário inexistente");

        if (dadosUsuarioAtual.nomeUsuario !== dadosEdicao.usuario.nomeUsuario) {
            const opcoesBuscaPorNomeUsuario: any = {};
            opcoesBuscaPorNomeUsuario.filtro = { nomeUsuario: dadosEdicao.usuario.nomeUsuario };
            if ((await this._usuarioAdminRepositorio.retornarEntidade(opcoesBuscaPorNomeUsuario)) != null)
                return this.retornoErro([{ mensagem: 'NOME DE USUÁRIO já existente no sistema' }]);
        }

        let permissoesAcesso = new Array<PermissaoAcesso>();
        if (dadosEdicao.usuario.permissoes && dadosEdicao.usuario.permissoes.length > 0) {
            for (let i = 0; i < dadosEdicao.usuario.permissoes.length; i++) {
                const opcoesBusca: any = {};
                opcoesBusca.filtro = { chave: dadosEdicao.usuario.permissoes[i] };
                const permissaoAcesso = await this._permissaoAcessoRepositorio.retornarEntidade(opcoesBusca);
                if (!permissaoAcesso)
                    throw new Error('Permissão inexistente');

                permissoesAcesso.push(permissaoAcesso);
            }
        }

        dadosUsuarioAtual.editar({
            nomeUsuario: dadosEdicao.usuario.nomeUsuario,
            senhaEditada: senhaEditada,
            senha: dadosEdicao.usuario.senha,
            nome: dadosEdicao.usuario.nome,
            permissoesAcesso: permissoesAcesso
        });

        await this._usuarioAdminRepositorio.salvarEntidade(dadosUsuarioAtual);
        dadosUsuarioAtual.senha = "";

        return this.retornoSucesso(dadosUsuarioAtual);
    }

    private validarEdicao(dadosEdicao: EdicaoUsuarioAdminViewModelServicoApp) {
        this._validacaoDados.obrigatorio(dadosEdicao.usuario.nome, 'NOME obrigatório');
        this._validacaoDados.tamanhoMinimo(dadosEdicao.usuario.nome, 2, 'NOME inválido');
        this._validacaoDados.tamanhoMaximo(dadosEdicao.usuario.nome, 45, 'NOME inválido');

        this._validacaoDados.obrigatorio(dadosEdicao.usuario.nomeUsuario, 'LOGIN obrigatório');
        this._validacaoDados.tamanhoMinimo(dadosEdicao.usuario.nomeUsuario, 3, 'LOGIN deve conter no mínimo 3 caracteres');
        this._validacaoDados.tamanhoMaximo(dadosEdicao.usuario.nomeUsuario, 20, 'LOGIN deve conter no máximo 20 caracteres');

        if (dadosEdicao.senhaEditada) {
            this._validacaoDados.obrigatorio(dadosEdicao.usuario.senha, 'SENHA obrigatória');
            this._validacaoDados.tamanhoMinimo(dadosEdicao.usuario.senha, 3, 'SENHA deve conter no mínimo 3 caracteres');
            this._validacaoDados.tamanhoMaximo(dadosEdicao.usuario.senha, 20, 'SENHA deve conter no máximo 20 caracteres');
        }

        if (!dadosEdicao.usuario.permissoes)
            dadosEdicao.usuario.permissoes = [];

        return dadosEdicao;
    }
}