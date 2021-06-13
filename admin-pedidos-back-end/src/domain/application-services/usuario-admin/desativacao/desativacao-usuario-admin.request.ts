import { RequestAppService } from "../../../../core/domain/application-services/request/request-app-service";
import { Flunt } from "../../../../core/validations/flunt";

export class DesativacaoUsuarioAdminRequest extends RequestAppService {
  constructor(
    public requestModel: {
      idUsuarioASerDesativado: number;
      idUsuarioRealizacaoOperacao: number;
    }
  ) {
    super();
  }

  validate(): boolean {
    const flunt = new Flunt();
    
    if (
      this.requestModel.idUsuarioRealizacaoOperacao ==
      this.requestModel.idUsuarioASerDesativado
    ) {
      throw new Error("operação inválida");
    }

    this.addNotifications(flunt.notifications);

    return this.isValid;
  }
}
