import { RequestAppService } from "../../../../core/domain/application-services/request/request-app-service";
import { Flunt } from "../../../../core/validations/flunt";

export class ProdutosPorConteudoDescricaoRequest extends RequestAppService {
  constructor(
    public requestModel: {
      descricao: string;
    }
  ) {
    super();
  }

  validate(): boolean {
    const flunt = new Flunt();

    flunt.isNotNullOrEmpty(
      this.requestModel.descricao,
      "descricao",
      "PRODUTO não informado"
    );
    flunt.isBetween(this.requestModel.descricao, 1, 45, "descricao", "PRODUTO inválido");

    this.addNotifications(flunt.notifications);

    return this.isValid;
  }
}
