import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoProdutoRepository } from "../../../../infra/data/repositories/tipo-produto.repository";
import { TipoProduto } from "../../../entities";

export class TiposProdutosAtivosAppService extends AppService<TipoProduto[]> {
  protected readonly tipoProdutoRepository = new TipoProdutoRepository();

  async handleAsync() {
    const opcoesBusca: any = {};
    opcoesBusca.camposRetorno = ["id", "descricao"];
    opcoesBusca.ordenacao = { descricao: "ASC" };
    opcoesBusca.filtro = { ativo: true };

    const tiposProduto =
      await this.tipoProdutoRepository.entidadesAsync(opcoesBusca);
    return this.returnData(tiposProduto);
  }
}
