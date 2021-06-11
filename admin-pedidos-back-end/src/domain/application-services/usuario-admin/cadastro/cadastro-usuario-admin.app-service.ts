import { autenticacaoUsuarioServico } from "../../../../apis/security/autenticacao-usuario.servico";
import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ValidacaoDados } from "../../../../core/helpers";
import { PermissaoAcessoRepositorio } from "../../../../infra/data/repositories/permissao-acesso.repositorio";
import { UsuarioAdminRepositorio } from "../../../../infra/data/repositories/usuario-admin.repositorio";
import { PermissaoAcesso, UsuarioAdmin } from "../../../entities";
import { CadastroUsuarioAdminRequest } from "./cadastro-usuario-admin.request";

export class CadastroUsuarioAdminAppService extends AppService {
    private readonly validacaoDados = new ValidacaoDados();
    private readonly permissaoAcessoRepositorio = new PermissaoAcessoRepositorio();
    private readonly usuarioAdminRepositorio = new UsuarioAdminRepositorio();

    async executar(model: CadastroUsuarioAdminRequest) {
        const dadosCadastro = this.validarCadastro(model);

        if (!this.validacaoDados.valido())
            return this.retornoErro(this.validacaoDados.recuperarErros());

        if ((await this.usuarioAdminRepositorio.existenciaUsuarioPorNomeUsuario(dadosCadastro.nomeUsuario)) === true)
            return this.retornoErro([{ mensagem: 'NOME DE USUÁRIO já existente no sistema' }]);

        let permissoesAcesso = new Array<PermissaoAcesso>();
        if (dadosCadastro.permissoes && dadosCadastro.permissoes.length > 0) {
            for (let i = 0; i < dadosCadastro.permissoes.length; i++) {
                const opcoesBusca: any = {};
                opcoesBusca.filtro = { chave: dadosCadastro.permissoes[i] };
                const permissaoAcesso = await this.permissaoAcessoRepositorio.retornarEntidade(opcoesBusca);
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

        await this.usuarioAdminRepositorio.salvarEntidade(usuarioCadastro);
        return this.retornoSucesso(usuarioCadastro);
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