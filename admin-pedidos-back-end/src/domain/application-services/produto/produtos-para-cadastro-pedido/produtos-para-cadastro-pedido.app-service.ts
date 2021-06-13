import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ProdutoRepository } from "../../../../infra/data/repositories/produto.repository";
import { Produto } from "../../../entities";

export class ProdutosParaCadastroPedidoAppService extends AppService<
  Produto[]
> {
  private readonly produtoRepository = new ProdutoRepository();

  async handleAsync() {
    let opcoesBusca: any = {};
    opcoesBusca.camposRetorno = ["id", "descricao", "valorUnitario"];
    opcoesBusca.filtro = { ativo: true };
    opcoesBusca.ordernacao = { descricao: "ASC" };

    const produtos = await this.produtoRepository.entidadesAsync(
      opcoesBusca
    );
    return this.returnData(produtos);
  }
}
