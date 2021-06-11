import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoPedidoRepository } from "../../../../infra/data/repositories/tipo-pedido.repository";

export class TiposPedidoAppService extends AppService {
    private readonly tipoPedidoRepository = new TipoPedidoRepository();
    
    async handle() {
        const opcoesBusca: any = { camposRetorno: ['id', 'descricao', 'ativo'] };
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        const tiposPedido = await this.tipoPedidoRepository.retornarColecaoEntidade(opcoesBusca);
        
        return this.returnSuccess(tiposPedido);
    }
}
