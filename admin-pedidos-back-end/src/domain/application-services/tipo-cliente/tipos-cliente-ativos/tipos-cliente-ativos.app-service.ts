import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoClienteRepositorio } from "../../../../infra/data/repositories/tipo-cliente.repositorio";

export class TiposClienteAtivosAppService extends AppService {
    private readonly tipoClienteRepositorio = new TipoClienteRepositorio();

    async executar() {
        const opcoesBusca: any = { camposRetorno: ['id', 'descricao'] };
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        opcoesBusca.filtro = { ativo: true };
        const tiposCliente = await this.tipoClienteRepositorio.retornarColecaoEntidade(opcoesBusca);

        return this.retornoSucesso(tiposCliente);
    }
}
