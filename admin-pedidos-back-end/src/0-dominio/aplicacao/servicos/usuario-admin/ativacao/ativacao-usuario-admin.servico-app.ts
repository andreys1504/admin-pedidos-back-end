import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao"
import { AtivacaoUsuarioAdminViewModelServicoApp } from "./ativacao-usuario-admin.view-model.servico-app";
import { UsuarioAdminRepositorio } from "../../../../repositorios/usuario-admin.repositorio";

export class AtivacaoUsuarioAdminServicoApp extends ServicoAplicacao {
    private readonly _usuarioAdminRepositorio = new UsuarioAdminRepositorio();

    async executar(model: AtivacaoUsuarioAdminViewModelServicoApp) {
        if (model.idUsuarioRealizacaoOperacao == model.idUsuarioASerAtivado)
            throw new Error('operação inválida');

        const opcoesBuscaPorId: any = {};
        opcoesBuscaPorId.filtro = { id: model.idUsuarioASerAtivado };
        const usuarioEdicao = await this._usuarioAdminRepositorio.retornarEntidade(opcoesBuscaPorId);
        if (!usuarioEdicao)
            throw new Error('operação inválida');

        usuarioEdicao.ativar();
        await this._usuarioAdminRepositorio.salvarEntidade(usuarioEdicao);

        return this.retornoSucesso('Usuário ativado');
    }
}