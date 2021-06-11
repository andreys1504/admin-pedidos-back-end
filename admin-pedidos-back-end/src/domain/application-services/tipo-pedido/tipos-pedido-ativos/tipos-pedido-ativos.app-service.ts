import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoPedidoRepository } from "../../../../infra/data/repositories/tipo-pedido.repository";

export class TiposPedidoAtivosAppService extends AppService {
    private readonly tipoPedidoRepository = new TipoPedidoRepository();
    
    async handle() {
        const opcoesBusca: any = {};
        opcoesBusca.camposRetorno = ['id', 'descricao'];
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        opcoesBusca.filtro = { ativo: true };

        const tiposPedido = await this.tipoPedidoRepository.retornarColecaoEntidade(opcoesBusca);
        return this.returnSuccess(tiposPedido);
    }
}
