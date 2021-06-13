import { RequestAppService } from "../../../../core/domain/application-services/request/request-app-service";
import { Flunt } from "../../../../core/validations/flunt";

export class CadastroTipoPagamentoRequest extends RequestAppService {
  constructor(
    public requestModel: {
      id: number;
      descricao: string;
      ativo: boolean;
    }
  ) {
    super();
  }

  validate(): boolean {
    const flunt = new Flunt();

    flunt.isBetween(this.requestModel.id, 1, 999, 'id', "ID inválido");

    if (this.requestModel.descricao) {
      this.requestModel.descricao = this.requestModel.descricao.trim();
    }
    flunt.isNotNullOrEmpty(
      this.requestModel.descricao,
      'descricao',
      "DESCRIÇÃO obrigatória"
    );
    flunt.hasMinLen(
      this.requestModel.descricao,
      2,
      'descricao',
      "DESCRIÇÃO inválida"
    );
    flunt.hasMaxLen(
      this.requestModel.descricao,
      45,
      'descricao',
      "DESCRIÇÃO inválida"
    );

    this.addNotifications(flunt.notifications);

    return this.isValid;
  }
}
