import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoClienteRepositorio } from "../../../../infra/data/repositories/tipo-cliente.repositorio";

export class TiposClienteAppService extends AppService {
    private readonly tipoClienteRepositorio = new TipoClienteRepositorio();

    async executar() {
        const opcoesBusca: any = { camposRetorno: ['id', 'descricao', 'ativo'] };
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        const tiposCliente = await this.tipoClienteRepositorio.retornarColecaoEntidade(opcoesBusca);

        return this.retornoSucesso(tiposCliente);
    }
}
