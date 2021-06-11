import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoClienteRepository } from "../../../../infra/data/repositories/tipo-cliente.repository";

export class TiposClienteAtivosAppService extends AppService {
    private readonly tipoClienteRepository = new TipoClienteRepository();

    async handle() {
        const opcoesBusca: any = { camposRetorno: ['id', 'descricao'] };
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        opcoesBusca.filtro = { ativo: true };
        const tiposCliente = await this.tipoClienteRepository.retornarColecaoEntidade(opcoesBusca);

        return this.returnSuccess(tiposCliente);
    }
}
