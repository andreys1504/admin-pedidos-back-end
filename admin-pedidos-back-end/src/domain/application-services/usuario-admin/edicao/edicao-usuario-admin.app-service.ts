import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ValidacaoDados } from "../../../../core/helpers";
import { PermissaoAcessoRepositorio } from "../../../../infra/data/repositories/permissao-acesso.repositorio";
import { UsuarioAdminRepositorio } from "../../../../infra/data/repositories/usuario-admin.repositorio";
import { PermissaoAcesso } from "../../../entities";
import { EdicaoUsuarioAdminRequest } from "./edicao-usuario-admin.request";

export class EdicaoUsuarioAdminAppService extends AppService {
    private readonly permissaoAcessoRepositorio = new PermissaoAcessoRepositorio();
    private readonly validacaoDados = new ValidacaoDados();
    private readonly usuarioAdminRepositorio = new UsuarioAdminRepositorio();

    async executar(model: EdicaoUsuarioAdminRequest) {
        const dadosValidados = this.validarEdicao(model);

        const senhaEditada = dadosValidados.senhaEditada;
        const dadosEdicao = dadosValidados;

        if (!this.validacaoDados.valido())
            return this.retornoErro(this.validacaoDados.recuperarErros());

        const dadosUsuarioAtual =
            await this.usuarioAdminRepositorio.retornarEntidade({ filtro: { id: dadosEdicao.usuario.idUsuario } } as any);

        if (!dadosUsuarioAtual)
            throw new Error("usuário inexistente");

        if (dadosUsuarioAtual.nomeUsuario !== dadosEdicao.usuario.nomeUsuario) {
            const opcoesBuscaPorNomeUsuario: any = {};
            opcoesBuscaPorNomeUsuario.filtro = { nomeUsuario: dadosEdicao.usuario.nomeUsuario };
            if ((await this.usuarioAdminRepositorio.retornarEntidade(opcoesBuscaPorNomeUsuario)) != null)
                return this.retornoErro([{ mensagem: 'NOME DE USUÁRIO já existente no sistema' }]);
        }

        let permissoesAcesso = new Array<PermissaoAcesso>();
        if (dadosEdicao.usuario.permissoes && dadosEdicao.usuario.permissoes.length > 0) {
            for (let i = 0; i < dadosEdicao.usuario.permissoes.length; i++) {
                const opcoesBusca: any = {};
                opcoesBusca.filtro = { chave: dadosEdicao.usuario.permissoes[i] };
                const permissaoAcesso = await this.permissaoAcessoRepositorio.retornarEntidade(opcoesBusca);
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

        await this.usuarioAdminRepositorio.salvarEntidade(dadosUsuarioAtual);
        dadosUsuarioAtual.senha = "";

        return this.retornoSucesso(dadosUsuarioAtual);
    }

    private validarEdicao(dadosEdicao: EdicaoUsuarioAdminRequest) {
        this.validacaoDados.obrigatorio(dadosEdicao.usuario.nome, 'NOME obrigatório');
        this.validacaoDados.tamanhoMinimo(dadosEdicao.usuario.nome, 2, 'NOME inválido');
        this.validacaoDados.tamanhoMaximo(dadosEdicao.usuario.nome, 45, 'NOME inválido');

        this.validacaoDados.obrigatorio(dadosEdicao.usuario.nomeUsuario, 'LOGIN obrigatório');
        this.validacaoDados.tamanhoMinimo(dadosEdicao.usuario.nomeUsuario, 3, 'LOGIN deve conter no mínimo 3 caracteres');
        this.validacaoDados.tamanhoMaximo(dadosEdicao.usuario.nomeUsuario, 20, 'LOGIN deve conter no máximo 20 caracteres');

        if (dadosEdicao.senhaEditada) {
            this.validacaoDados.obrigatorio(dadosEdicao.usuario.senha, 'SENHA obrigatória');
            this.validacaoDados.tamanhoMinimo(dadosEdicao.usuario.senha, 3, 'SENHA deve conter no mínimo 3 caracteres');
            this.validacaoDados.tamanhoMaximo(dadosEdicao.usuario.senha, 20, 'SENHA deve conter no máximo 20 caracteres');
        }

        if (!dadosEdicao.usuario.permissoes)
            dadosEdicao.usuario.permissoes = [];

        return dadosEdicao;
    }
}