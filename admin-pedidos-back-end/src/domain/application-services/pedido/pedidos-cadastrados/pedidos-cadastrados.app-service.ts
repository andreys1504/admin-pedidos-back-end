import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { PedidoRepository } from "../../../../infra/data/repositories/pedido.repository";
import { Pedido } from "../../../entities";

export class PedidosCadastradosAppService extends AppService<Pedido[]> {
    private readonly pedidoRepository = new PedidoRepository();

    async handleAsync() {
        const opcoesBusca: any = {};
        opcoesBusca.entidadesRelacionadas = ['itensPedido'];
        opcoesBusca.ordenacao = { id: 'DESC' };

        const pedidos = await this.pedidoRepository.entidadesAsync(opcoesBusca);
        return this.returnData(pedidos);
    }
}
