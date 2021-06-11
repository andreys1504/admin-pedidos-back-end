import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { PedidoRepositorio } from "../../../../infra/data/repositories/pedido.repositorio";

export class PedidosCadastradosAppService extends AppService {
    private readonly pedidoRepositorio = new PedidoRepositorio();

    async executar() {
        const opcoesBusca: any = {};
        opcoesBusca.entidadesRelacionadas = ['itensPedido'];
        opcoesBusca.ordenacao = { id: 'DESC' };

        const pedidos = await this.pedidoRepositorio.retornarColecaoEntidade(opcoesBusca);
        return this.retornoSucesso(pedidos);
    }
}
