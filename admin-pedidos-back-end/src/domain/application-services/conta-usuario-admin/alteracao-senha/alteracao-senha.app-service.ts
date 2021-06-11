import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ValidacaoDados } from "../../../../core/helpers";
import { UsuarioAdminRepository } from "../../../../infra/data/repositories/usuario-admin.repository";
import { UsuarioAdmin } from "../../../entities";
import { AlteracaoSenhaRequest } from "./alteracao-senha.request";

export class AlteracaoSenhaAppService extends AppService {
    private readonly validacaoDados = new ValidacaoDados();
    private readonly usuarioAdminRepository = new UsuarioAdminRepository();

    async handle(request: AlteracaoSenhaRequest) {
        request = this.validarAlteracaoSenha(request);

        if (!this.validacaoDados.valido())
            return this.returnNotifications(this.validacaoDados.recuperarErros());

        let opcoesBuscaUsuario: any = {};
        opcoesBuscaUsuario.filtro = {
            nomeUsuario: request.nomeUsuario,
            senha: UsuarioAdmin.gerarSenha(request.senhaAtual)
        };

        const usuarioEdicao = await this.usuarioAdminRepository.retornarEntidade(opcoesBuscaUsuario);
        if (!usuarioEdicao)
            return this.returnNotifications([{ mensagem: 'SENHA ATUAL inválida' }]);

        usuarioEdicao.alterarSenha(request.confirmacaoNovaSenha);
        await this.usuarioAdminRepository.salvarEntidade(usuarioEdicao);

        return this.returnSuccess({ mensagem: 'Senha alterada com sucesso' });
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
