import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { UsuarioAdminRepository } from "../../../../infra/data/repositories/usuario-admin.repository";
import { DesativacaoUsuarioAdminRequest } from "./desativacao-usuario-admin.request";

export class DesativacaoUsuarioAdminAppService extends AppService {
    private readonly usuarioAdminRepository = new UsuarioAdminRepository();

    async handle(request: DesativacaoUsuarioAdminRequest) {
        if (request.idUsuarioRealizacaoOperacao == request.idUsuarioASerDesativado)
            throw new Error('operação inválida');

        const opcoesBuscaPorId: any = {};
        opcoesBuscaPorId.filtro = { id: request.idUsuarioASerDesativado };
        const usuarioEdicao = await this.usuarioAdminRepository.retornarEntidade(opcoesBuscaPorId);
        if (!usuarioEdicao)
            throw new Error('operação inválida');

        usuarioEdicao.desativar();
        await this.usuarioAdminRepository.salvarEntidade(usuarioEdicao);

        return this.returnSuccess('Usuário desativado');
    }
}
