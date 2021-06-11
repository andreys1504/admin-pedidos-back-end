import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { SituacaoExternaItemPedidoRepositorio } from "../../../../infra/data/repositories/situacao-externa-item-pedido.repositorio";

export class SituacoesExternasItemPedidoAppService extends AppService {
    private readonly situacaoExternaItemRepositorio = new SituacaoExternaItemPedidoRepositorio();

    async executar() {
        const opcoesBusca: any = { camposRetorno: ['id', 'descricao', 'ativo'] };
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        const situacoesExternasItem = await this.situacaoExternaItemRepositorio.retornarColecaoEntidade(opcoesBusca);

        return this.retornoSucesso(situacoesExternasItem);
    }
}
