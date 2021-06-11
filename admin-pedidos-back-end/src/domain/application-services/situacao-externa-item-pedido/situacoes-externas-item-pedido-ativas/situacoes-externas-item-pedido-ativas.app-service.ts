import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { SituacaoExternaItemPedidoRepositorio } from "../../../../infra/data/repositories/situacao-externa-item-pedido.repositorio";

export class SituacoesExternasItemPedidoAtivasAppService extends AppService {
    private readonly situacaoExternaItemRepositorio = new SituacaoExternaItemPedidoRepositorio();

    async executar() {
        let opcoesBusca: any = {};
        opcoesBusca.camposRetorno = ['id', 'descricao'];
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        opcoesBusca.filtro = { ativo: true };

        const situacoesExternasItem = await this.situacaoExternaItemRepositorio.retornarColecaoEntidade(opcoesBusca);
        return this.retornoSucesso(situacoesExternasItem);
    }
}
