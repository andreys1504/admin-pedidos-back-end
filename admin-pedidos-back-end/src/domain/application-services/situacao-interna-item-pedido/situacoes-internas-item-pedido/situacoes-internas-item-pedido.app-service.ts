import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { SituacaoInternaItemPedidoRepositorio } from "../../../../infra/data/repositories/situacao-interna-item-pedido.repositorio";

export class SituacoesInternasItemPedidoAppService extends AppService{
    private readonly situacaoInternaItemRepositorio = new SituacaoInternaItemPedidoRepositorio();

    async executar() {
        const opcoesBusca: any = { camposRetorno: ['id', 'descricao', 'ativo'] };
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        const situacoesInternasItem = await this.situacaoInternaItemRepositorio.retornarColecaoEntidade(opcoesBusca);

        return this.retornoSucesso(situacoesInternasItem);
    }
}
