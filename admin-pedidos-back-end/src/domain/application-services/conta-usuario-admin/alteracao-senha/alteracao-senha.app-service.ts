import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ValidacaoDados } from "../../../../core/helpers";
import { UsuarioAdminRepositorio } from "../../../../infra/data/repositories/usuario-admin.repositorio";
import { UsuarioAdmin } from "../../../entities";
import { AlteracaoSenhaRequest } from "./alteracao-senha.request";

export class AlteracaoSenhaAppService extends AppService {
    private readonly validacaoDados = new ValidacaoDados();
    private readonly usuarioAdminRepositorio = new UsuarioAdminRepositorio();

    async executar(model: AlteracaoSenhaRequest) {
        model = this.validarAlteracaoSenha(model);

        if (!this.validacaoDados.valido())
            return this.retornoErro(this.validacaoDados.recuperarErros());

        let opcoesBuscaUsuario: any = {};
        opcoesBuscaUsuario.filtro = {
            nomeUsuario: model.nomeUsuario,
            senha: UsuarioAdmin.gerarSenha(model.senhaAtual)
        };

        const usuarioEdicao = await this.usuarioAdminRepositorio.retornarEntidade(opcoesBuscaUsuario);
        if (!usuarioEdicao)
            return this.retornoErro([{ mensagem: 'SENHA ATUAL inválida' }]);

        usuarioEdicao.alterarSenha(model.confirmacaoNovaSenha);
        await this.usuarioAdminRepositorio.salvarEntidade(usuarioEdicao);

        return this.retornoSucesso({ mensagem: 'Senha alterada com sucesso' });
    }

    private validarAlteracaoSenha(dadosAlteracaoSenha: AlteracaoSenhaRequest) {
        this.validacaoDados.obrigatorio(dadosAlteracaoSenha.senhaAtual, 'SENHA ATUAL não informada');
        this.validacaoDados.tamanhoMinMax(dadosAlteracaoSenha.senhaAtual, 3, 20, 'SENHA ATUAL inválida');

        this.validacaoDados.obrigatorio(dadosAlteracaoSenha.novaSenha, 'NOVA SENHA não informada');
        this.validacaoDados.tamanhoMinMax(dadosAlteracaoSenha.novaSenha, 3, 20, 'NOVA SENHA inválida');

        this.validacaoDados.obrigatorio(dadosAlteracaoSenha.confirmacaoNovaSenha, 'CONFIRMAÇÃO NOVA SENHA não informada');
        this.validacaoDados.tamanhoMinMax(dadosAlteracaoSenha.confirmacaoNovaSenha, 3, 20, 'CONFIRMAÇÃO NOVA SENHA inválida');
        this.validacaoDados.igual(
            dadosAlteracaoSenha.novaSenha,
            dadosAlteracaoSenha.confirmacaoNovaSenha,
            'NOVAS SENHAS estão divergentes');

        this.validacaoDados.naoIgual(
            dadosAlteracaoSenha.senhaAtual,
            dadosAlteracaoSenha.confirmacaoNovaSenha,
            'NOVA SENHA deve ser diferente da atual');

        return dadosAlteracaoSenha;
    }
}