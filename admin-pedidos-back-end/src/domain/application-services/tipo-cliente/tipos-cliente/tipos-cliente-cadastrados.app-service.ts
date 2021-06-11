import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoClienteRepository } from "../../../../infra/data/repositories/tipo-cliente.repository";

export class TiposClienteAppService extends AppService {
    private readonly tipoClienteRepository = new TipoClienteRepository();

    async handle() {
        const opcoesBusca: any = { camposRetorno: ['id', 'descricao', 'ativo'] };
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        const tiposCliente = await this.tipoClienteRepository.retornarColecaoEntidade(opcoesBusca);

        return this.returnSuccess(tiposCliente);
    }
}
