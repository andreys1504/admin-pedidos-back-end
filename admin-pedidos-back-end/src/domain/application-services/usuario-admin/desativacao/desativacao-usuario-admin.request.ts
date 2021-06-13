import { RequestAppService } from '../../../../core/domain/application-services/request/request-app-service';
import { DomainException } from '../../../../core/domain/exceptions/domain.exception';
import { Flunt } from '../../../../core/validations/flunt';

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
      throw new DomainException('operação inválida');
    }

    this.addNotifications(flunt.notifications);

    return this.isValid;
  }
}
