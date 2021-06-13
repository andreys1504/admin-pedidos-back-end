import { RequestAppService } from "../../../../core/domain/application-services/request/request-app-service";
import { Flunt } from "../../../../core/validations/flunt";

export class AutenticacaoRequest extends RequestAppService {
  constructor(
    public requestModel: {
      nomeUsuario: string;
      senha: string;
    }
  ) {
    super();
  }

  validate(): boolean {
    const flunt = new Flunt();

    if (this.requestModel.nomeUsuario) {
      this.requestModel.nomeUsuario = this.requestModel.nomeUsuario.trim();
    }
    flunt.isNotNullOrEmpty(
      this.requestModel.nomeUsuario,
      "nomeUsuario",
      "Login não informado"
    );
    flunt.hasMaxLen(
      this.requestModel.nomeUsuario,
      20,
      "nomeUsuario",
      "Usuário ou senha inválidos"
    );

    if (this.requestModel.senha) {
      this.requestModel.senha = this.requestModel.senha.trim();
    }
    flunt.isNotNullOrEmpty(
      this.requestModel.senha,
      "senha",
      "SENHA não informada"
    );
    flunt.hasMaxLen(
      this.requestModel.senha,
      20,
      "senha",
      "Usuário ou senha inválidos"
    );

    this.addNotifications(flunt.notifications);

    return this.isValid;
  }
}
