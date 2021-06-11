import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { PedidoRepository } from "../../../../infra/data/repositories/pedido.repository";

export class PedidosCadastradosAppService extends AppService {
    private readonly pedidoRepository = new PedidoRepository();

    async handle() {
        const opcoesBusca: any = {};
        opcoesBusca.entidadesRelacionadas = ['itensPedido'];
        opcoesBusca.ordenacao = { id: 'DESC' };

        const pedidos = await this.pedidoRepository.retornarColecaoEntidade(opcoesBusca);
        return this.returnSuccess(pedidos);
    }
}
