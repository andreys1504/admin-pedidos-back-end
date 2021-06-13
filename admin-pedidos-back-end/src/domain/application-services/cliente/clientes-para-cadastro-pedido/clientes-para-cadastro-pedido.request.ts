import { RequestAppService } from "../../../../core/domain/application-services/request/request-app-service";
import { getNumbersText } from "../../../../core/helpers";
import { Flunt } from "../../../../core/validations/flunt";
import { Cliente } from "../../../entities";

export class ClientesParaCadastroPedidoRequest extends RequestAppService {
  constructor(
    public requestModel: {
      nomeCpfCnpj: string;
    }
  ) {
    super();
  }

  validate(): boolean {
    const flunt = new Flunt();

    if (this.requestModel.nomeCpfCnpj) {
      this.requestModel.nomeCpfCnpj = this.requestModel.nomeCpfCnpj.trim();
    }
    flunt.isNotNullOrEmpty(
      this.requestModel.nomeCpfCnpj,
      "nomeCpfCnpj",
      "filtro não informado"
    );

    const cpfCnpj = getNumbersText(this.requestModel.nomeCpfCnpj);
    if (cpfCnpj) {
      if (Flunt.isCpf(cpfCnpj)) {
        flunt.isCpf(cpfCnpj, "cpfCnpj", "CPF ou CNPJ inválidos");
      } else {
        flunt.isCnpj(cpfCnpj, "cpfCnpj", "CPF ou CNPJ inválidos");
      }
    } else {
      if (!Cliente.nomeClienteValido(this.requestModel.nomeCpfCnpj)) {
        this.addNotification(this.requestModel.nomeCpfCnpj, "NOME inválido");
      }
    }

    this.addNotifications(flunt.notifications);

    return this.isValid;
  }
}
