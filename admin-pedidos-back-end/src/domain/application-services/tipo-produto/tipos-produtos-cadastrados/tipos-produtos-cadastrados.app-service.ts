import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoProdutoRepository } from "../../../../infra/data/repositories/tipo-produto.repository";
import { TipoProduto } from "../../../entities";

export class TiposProdutosCadastradosAppService extends AppService<
  TipoProduto[]
> {
  private readonly tipoProdutoRepository = new TipoProdutoRepository();

  async handleAsync() {
    const opcoesBusca: any = { camposRetorno: ["id", "descricao", "ativo"] };
    opcoesBusca.ordenacao = { descricao: "ASC" };
    const tiposProduto =
      await this.tipoProdutoRepository.entidadesAsync(opcoesBusca);

    return this.returnData(tiposProduto);
  }
}
