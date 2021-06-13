import { RequestAppService } from '../../../../core/domain/application-services/request/request-app-service';
import { DomainException } from '../../../../core/domain/exceptions/domain.exception';
import { Flunt } from '../../../../core/validations/flunt';

export class AtivacaoUsuarioAdminRequest extends RequestAppService {
  constructor(
    public requestModel: {
      idUsuarioASerAtivado: number;
      idUsuarioRealizacaoOperacao: number;
    }
  ) {
    super();
  }

  validate(): boolean {
    const flunt = new Flunt();
    
    if (
      this.requestModel.idUsuarioRealizacaoOperacao ==
      this.requestModel.idUsuarioASerAtivado
    ) {
      throw new DomainException('operação inválida');
    }

    this.addNotifications(flunt.notifications);

    return this.isValid;
  }
}
