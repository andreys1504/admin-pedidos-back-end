import { RequestAppService } from "../../../../core/domain/application-services/request/request-app-service";
import { DomainException } from "../../../../core/domain/exceptions/domain.exception";
import { Flunt } from "../../../../core/validations/flunt";

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
      flunt.isBetween(
        this.requestModel.descricao,
        1,
        45,
        "descricao",
        "PRODUTO inválido"
      );
    } else if (!this.requestModel.idProduto) {
      throw new DomainException("nenhum item foi informado");
    }

    this.addNotifications(flunt.notifications);

    return this.isValid;
  }
}
