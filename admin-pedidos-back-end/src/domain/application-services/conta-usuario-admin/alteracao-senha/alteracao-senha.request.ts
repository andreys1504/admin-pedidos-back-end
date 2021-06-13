import { RequestAppService } from "../../../../core/domain/application-services/request/request-app-service";
import { Flunt } from "../../../../core/validations/flunt";

export class AlteracaoSenhaRequest extends RequestAppService {
  constructor(
    public requestModel: {
      senhaAtual: string;
      novaSenha: string;
      confirmacaoNovaSenha: string;
      nomeUsuario: string;
    }
  ) {
    super();
  }

  validate(): boolean {
    const flunt = new Flunt();

    if (this.requestModel.senhaAtual) {
      this.requestModel.senhaAtual = this.requestModel.senhaAtual.trim();
    }
    flunt.isNotNullOrEmpty(
      this.requestModel.senhaAtual,
      "senhaAtual",
      "SENHA ATUAL não informada"
    );
    flunt.isBetween(
      this.requestModel.senhaAtual,
      3,
      20,
      "senhaAtual",
      "SENHA ATUAL inválida"
    );

    if (this.requestModel.novaSenha) {
      this.requestModel.novaSenha = this.requestModel.novaSenha.trim();
    }
    flunt.isNotNullOrEmpty(
      this.requestModel.novaSenha,
      "novaSenha",
      "NOVA SENHA não informada"
    );
    flunt.isBetween(
      this.requestModel.novaSenha,
      3,
      20,
      "novaSenha",
      "NOVA SENHA inválida"
    );

    if (this.requestModel.confirmacaoNovaSenha) {
      this.requestModel.confirmacaoNovaSenha =
        this.requestModel.confirmacaoNovaSenha.trim();
    }
    flunt.isNotNullOrEmpty(
      this.requestModel.confirmacaoNovaSenha,
      "confirmacaoNovaSenha",
      "CONFIRMAÇÃO NOVA SENHA não informada"
    );
    flunt.isBetween(
      this.requestModel.confirmacaoNovaSenha,
      3,
      20,
      "confirmacaoNovaSenha",
      "CONFIRMAÇÃO NOVA SENHA inválida"
    );
    flunt.isEqual(
      this.requestModel.novaSenha,
      this.requestModel.confirmacaoNovaSenha,
      "confirmacaoNovaSenha",
      "NOVAS SENHAS estão divergentes"
    );

    flunt.isNotEqual(
      this.requestModel.senhaAtual,
      this.requestModel.confirmacaoNovaSenha,
      "confirmacaoNovaSenha",
      "NOVA SENHA deve ser diferente da atual"
    );

    this.addNotifications(flunt.notifications);

    return this.isValid;
  }
}
