import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { UsuarioAdminRepositorio } from "../../../../infra/data/repositories/usuario-admin.repositorio";
import { DesativacaoUsuarioAdminRequest } from "./desativacao-usuario-admin.request";

export class DesativacaoUsuarioAdminAppService extends AppService {
    private readonly usuarioAdminRepositorio = new UsuarioAdminRepositorio();

    async executar(model: DesativacaoUsuarioAdminRequest) {
        if (model.idUsuarioRealizacaoOperacao == model.idUsuarioASerDesativado)
            throw new Error('operação inválida');

        const opcoesBuscaPorId: any = {};
        opcoesBuscaPorId.filtro = { id: model.idUsuarioASerDesativado };
        const usuarioEdicao = await this.usuarioAdminRepositorio.retornarEntidade(opcoesBuscaPorId);
        if (!usuarioEdicao)
            throw new Error('operação inválida');

        usuarioEdicao.desativar();
        await this.usuarioAdminRepositorio.salvarEntidade(usuarioEdicao);

        return this.retornoSucesso('Usuário desativado');
    }
}
