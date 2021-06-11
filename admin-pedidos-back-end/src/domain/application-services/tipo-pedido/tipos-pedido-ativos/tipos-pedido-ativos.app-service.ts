import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoPedidoRepositorio } from "../../../../infra/data/repositories/tipo-pedido.repositorio";

export class TiposPedidoAtivosAppService extends AppService {
    private readonly tipoPedidoRepositorio = new TipoPedidoRepositorio();
    
    async executar() {
        const opcoesBusca: any = {};
        opcoesBusca.camposRetorno = ['id', 'descricao'];
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        opcoesBusca.filtro = { ativo: true };

        const tiposPedido = await this.tipoPedidoRepositorio.retornarColecaoEntidade(opcoesBusca);
        return this.retornoSucesso(tiposPedido);
    }
}
