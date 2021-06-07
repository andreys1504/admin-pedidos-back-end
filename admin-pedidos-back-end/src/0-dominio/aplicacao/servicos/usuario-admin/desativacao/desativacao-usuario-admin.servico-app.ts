import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { UsuarioAdminRepositorio } from "../../../../repositorios/usuario-admin.repositorio";
import { DesativacaoUsuarioAdminViewModelServicoApp } from "./desativacao-usuario-admin.view-model.servico-app";

export class DesativacaoUsuarioAdminServicoApp extends ServicoAplicacao {
    private readonly _usuarioAdminRepositorio = new UsuarioAdminRepositorio();

    async executar(model: DesativacaoUsuarioAdminViewModelServicoApp) {
        if (model.idUsuarioRealizacaoOperacao == model.idUsuarioASerDesativado)
            throw new Error('operação inválida');

        const opcoesBuscaPorId: any = {};
        opcoesBuscaPorId.filtro = { id: model.idUsuarioASerDesativado };
        const usuarioEdicao = await this._usuarioAdminRepositorio.retornarEntidade(opcoesBuscaPorId);
        if (!usuarioEdicao)
            throw new Error('operação inválida');

        usuarioEdicao.desativar();
        await this._usuarioAdminRepositorio.salvarEntidade(usuarioEdicao);

        return this.retornoSucesso('Usuário desativado');
    }
}