import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoPedidoRepositorio } from "../../../../infra/data/repositories/tipo-pedido.repositorio";

export class TiposPedidoAppService extends AppService {
    private readonly tipoPedidoRepositorio = new TipoPedidoRepositorio();
    
    async executar() {
        const opcoesBusca: any = { camposRetorno: ['id', 'descricao', 'ativo'] };
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        const tiposPedido = await this.tipoPedidoRepositorio.retornarColecaoEntidade(opcoesBusca);
        
        return this.retornoSucesso(tiposPedido);
    }
}
