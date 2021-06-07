import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao"
import { AlteracaoSenhaViewModelServicoApp } from "./alteracao-senha.view-model.servico-app";
import { ValidacaoDados } from "../../../../../0-core/helpers";
import { UsuarioAdminRepositorio } from "../../../../repositorios/usuario-admin.repositorio";
import { UsuarioAdmin } from "../../../../entidades";

export class AlteracaoSenhaServicoApp extends ServicoAplicacao {
    private readonly _validacaoDados = new ValidacaoDados();
    private readonly _usuarioAdminRepositorio = new UsuarioAdminRepositorio();

    async executar(model: AlteracaoSenhaViewModelServicoApp) {
        model = this.validarAlteracaoSenha(model);

        if (!this._validacaoDados.valido())
            return this.retornoErro(this._validacaoDados.recuperarErros());

        let opcoesBuscaUsuario: any = {};
        opcoesBuscaUsuario.filtro = {
            nomeUsuario: model.nomeUsuario,
            senha: UsuarioAdmin.gerarSenha(model.senhaAtual)
        };

        const usuarioEdicao = await this._usuarioAdminRepositorio.retornarEntidade(opcoesBuscaUsuario);
        if (!usuarioEdicao)
            return this.retornoErro([{ mensagem: 'SENHA ATUAL inválida' }]);

        usuarioEdicao.alterarSenha(model.confirmacaoNovaSenha);
        await this._usuarioAdminRepositorio.salvarEntidade(usuarioEdicao);

        return this.retornoSucesso({ mensagem: 'Senha alterada com sucesso' });
    }

    private validarAlteracaoSenha(dadosAlteracaoSenha: AlteracaoSenhaViewModelServicoApp) {
        this._validacaoDados.obrigatorio(dadosAlteracaoSenha.senhaAtual, 'SENHA ATUAL não informada');
        this._validacaoDados.tamanhoMinMax(dadosAlteracaoSenha.senhaAtual, 3, 20, 'SENHA ATUAL inválida');

        this._validacaoDados.obrigatorio(dadosAlteracaoSenha.novaSenha, 'NOVA SENHA não informada');
        this._validacaoDados.tamanhoMinMax(dadosAlteracaoSenha.novaSenha, 3, 20, 'NOVA SENHA inválida');

        this._validacaoDados.obrigatorio(dadosAlteracaoSenha.confirmacaoNovaSenha, 'CONFIRMAÇÃO NOVA SENHA não informada');
        this._validacaoDados.tamanhoMinMax(dadosAlteracaoSenha.confirmacaoNovaSenha, 3, 20, 'CONFIRMAÇÃO NOVA SENHA inválida');
        this._validacaoDados.igual(
            dadosAlteracaoSenha.novaSenha,
            dadosAlteracaoSenha.confirmacaoNovaSenha,
            'NOVAS SENHAS estão divergentes');

        this._validacaoDados.naoIgual(
            dadosAlteracaoSenha.senhaAtual,
            dadosAlteracaoSenha.confirmacaoNovaSenha,
            'NOVA SENHA deve ser diferente da atual');

        return dadosAlteracaoSenha;
    }
}