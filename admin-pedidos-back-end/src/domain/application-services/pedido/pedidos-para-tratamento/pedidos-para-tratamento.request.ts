import { RequestAppService } from '../../../../core/domain/application-services/request/request-app-service';
import { Flunt } from '../../../../core/validations/flunt';

export class PedidosParaTratamentoRequest extends RequestAppService {
  constructor(
    public requestModel: {
      idPedido?: number;
      cpfCnpj?: string | undefined;
      dataEmissaoPedido?: string | undefined;
      pedidosPendentes?: boolean | undefined;
      idUsuarioResponsavelPedido?: number | undefined;
    }
  ) {
    super();
  }

  validate(): boolean {
    const flunt = new Flunt();

    this.addNotifications(flunt.notifications);

    return this.isValid;
  }
}
