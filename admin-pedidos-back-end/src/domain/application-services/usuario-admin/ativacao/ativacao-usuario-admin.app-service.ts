import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { UsuarioAdminRepositorio } from "../../../../infra/data/repositories/usuario-admin.repositorio";
import { AtivacaoUsuarioAdminRequest } from "./ativacao-usuario-admin.request";

export class AtivacaoUsuarioAdminAppService extends AppService {
    private readonly usuarioAdminRepositorio = new UsuarioAdminRepositorio();

    async executar(model: AtivacaoUsuarioAdminRequest) {
        if (model.idUsuarioRealizacaoOperacao == model.idUsuarioASerAtivado)
            throw new Error('operação inválida');

        const opcoesBuscaPorId: any = {};
        opcoesBuscaPorId.filtro = { id: model.idUsuarioASerAtivado };
        const usuarioEdicao = await this.usuarioAdminRepositorio.retornarEntidade(opcoesBuscaPorId);
        if (!usuarioEdicao)
            throw new Error('operação inválida');

        usuarioEdicao.ativar();
        await this.usuarioAdminRepositorio.salvarEntidade(usuarioEdicao);

        return this.retornoSucesso('Usuário ativado');
    }
}
