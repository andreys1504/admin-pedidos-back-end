import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ValidacaoDados } from "../../../../core/helpers";
import { PermissaoAcessoRepository } from "../../../../infra/data/repositories/permissao-acesso.repository";
import { UsuarioAdminRepository } from "../../../../infra/data/repositories/usuario-admin.repository";
import { gerarSenhaCodificada, PermissaoAcesso, UsuarioAdmin } from "../../../entities";
import { CadastroUsuarioAdminRequest } from "./cadastro-usuario-admin.request";

export class CadastroUsuarioAdminAppService extends AppService {
    private readonly validacaoDados = new ValidacaoDados();
    private readonly permissaoAcessoRepository = new PermissaoAcessoRepository();
    private readonly usuarioAdminRepository = new UsuarioAdminRepository();

    async handle(request: CadastroUsuarioAdminRequest) {
        const dadosCadastro = this.validarCadastro(request);

        if (!this.validacaoDados.valido())
            return this.returnNotifications(this.validacaoDados.recuperarErros());

        if ((await this.usuarioAdminRepository.existenciaUsuarioPorNomeUsuario(dadosCadastro.nomeUsuario)) === true)
            return this.returnNotifications([{ mensagem: 'NOME DE USUÁRIO já existente no sistema' }]);

        let permissoesAcesso = new Array<PermissaoAcesso>();
        if (dadosCadastro.permissoes && dadosCadastro.permissoes.length > 0) {
            for (let i = 0; i < dadosCadastro.permissoes.length; i++) {
                const opcoesBusca: any = {};
                opcoesBusca.filtro = { chave: dadosCadastro.permissoes[i] };
                const permissaoAcesso = await this.permissaoAcessoRepository.retornarEntidade(opcoesBusca);
                if (!permissaoAcesso)
                    throw new Error('Permissão inexistente');

                permissoesAcesso.push(permissaoAcesso);
            }
        }

        const usuarioCadastro = new UsuarioAdmin();
        usuarioCadastro.novoUsuario({
            nomeUsuario: dadosCadastro.nomeUsuario,
            senha: gerarSenhaCodificada(dadosCadastro.senha),
            nome: dadosCadastro.nome,
            permissoesAcesso
        });

        await this.usuarioAdminRepository.salvarEntidade(usuarioCadastro);
        return this.returnSuccess(usuarioCadastro);
    }

    private validarCadastro(dadosCadastro: CadastroUsuarioAdminRequest) {
        this.validacaoDados.obrigatorio(dadosCadastro.nome, 'NOME obrigatório');
        this.validacaoDados.tamanhoMinimo(dadosCadastro.nome, 2, 'NOME inválido');
        this.validacaoDados.tamanhoMaximo(dadosCadastro.nome, 45, 'NOME inválido');

        this.validacaoDados.obrigatorio(dadosCadastro.nomeUsuario, 'LOGIN obrigatório');
        this.validacaoDados.tamanhoMinimo(dadosCadastro.nomeUsuario, 3, 'LOGIN deve conter no mínimo 3 caracteres');
        this.validacaoDados.tamanhoMaximo(dadosCadastro.nomeUsuario, 20, 'LOGIN deve conter no máximo 20 caracteres');
        if (!UsuarioAdmin.nomeUsuarioCaracteresValidos(dadosCadastro.nomeUsuario))
            this.validacaoDados.adicionarMensagem('informe um LOGIN sem espaços, acentos e caracteres especiais');

        this.validacaoDados.obrigatorio(dadosCadastro.senha, 'SENHA obrigatória');
        this.validacaoDados.tamanhoMinimo(dadosCadastro.senha, 3, 'SENHA deve conter no mínimo 3 caracteres');
        this.validacaoDados.tamanhoMaximo(dadosCadastro.senha, 20, 'SENHA deve conter no máximo 20 caracteres');

        if (!dadosCadastro.permissoes)
            dadosCadastro.permissoes = [];

        return dadosCadastro;
    }
}
