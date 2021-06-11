import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { UsuarioAdminRepository } from "../../../../infra/data/repositories/usuario-admin.repository";
import { AtivacaoUsuarioAdminRequest } from "./ativacao-usuario-admin.request";

export class AtivacaoUsuarioAdminAppService extends AppService {
    private readonly usuarioAdminRepository = new UsuarioAdminRepository();

    async handle(model: AtivacaoUsuarioAdminRequest) {
        if (model.idUsuarioRealizacaoOperacao == model.idUsuarioASerAtivado)
            throw new Error('operação inválida');

        const opcoesBuscaPorId: any = {};
        opcoesBuscaPorId.filtro = { id: model.idUsuarioASerAtivado };
        const usuarioEdicao = await this.usuarioAdminRepository.retornarEntidade(opcoesBuscaPorId);
        if (!usuarioEdicao)
            throw new Error('operação inválida');

        usuarioEdicao.ativar();
        await this.usuarioAdminRepository.salvarEntidade(usuarioEdicao);

        return this.returnSuccess('Usuário ativado');
    }
}
