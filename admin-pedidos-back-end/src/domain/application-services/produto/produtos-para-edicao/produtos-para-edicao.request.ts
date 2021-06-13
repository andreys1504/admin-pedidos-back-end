import { RequestAppService } from "../../../../core/domain/application-services/request/request-app-service";
import { Flunt } from "../../../../core/validations/flunt";
import { Produto } from "../../../entities";

export class ProdutosParaEdicaoRequest extends RequestAppService {
  constructor(
    public requestModel: {
      descricao: string;
      idProduto: number;
    }
  ) {
    super();
  }

  validate(): boolean {
    const flunt = new Flunt();

    if (this.requestModel.descricao) {
      this.requestModel.descricao = this.requestModel.descricao.trim();

      flunt.isNotNullOrEmpty(
        this.requestModel.descricao,
        "descricao",
        "PRODUTO não informado"
      );
      if (!Produto.nomeProdutoValido(this.requestModel.descricao)) {
        this.addNotification("descricao", "PRODUTO inválido");
      }
    } else if (!this.requestModel.idProduto) {
      throw new Error("nenhum item foi informado");
    }

    this.addNotifications(flunt.notifications);

    return this.isValid;
  }
}
