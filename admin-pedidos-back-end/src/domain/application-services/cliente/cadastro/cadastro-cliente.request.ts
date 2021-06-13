import { RequestAppService } from "../../../../core/domain/application-services/request/request-app-service";
import { getNumbersText } from "../../../../core/helpers";
import { Flunt } from "../../../../core/validations/flunt";

export class CadastroClienteRequest extends RequestAppService {
  constructor(
    public requestModel: {
      nome: string;
      nomeGuerra: string;
      idTipoCliente: number;
      cpfCnpj: string;
      logradouro: string;
      cep: string;
      nomeCidade: string;
      siglaUf: string;
      telefone: string;
      email: string;
      tipoSanguineo: string;
      medidasCliente: string;
    }
  ) {
    super();
  }

  validate(): boolean {
    const flunt = new Flunt();

    if (this.requestModel.nome) {
      this.requestModel.nome = this.requestModel.nome.trim();
    }
    flunt.isNotNullOrEmpty(this.requestModel.nome, "nome", "NOME obrigatório");
    flunt.hasMinLen(this.requestModel.nome, 2, "nome", "NOME inválido");
    flunt.hasMaxLen(this.requestModel.nome, 45, "nome", "NOME inválido");

    if (this.requestModel.nomeGuerra) {
      this.requestModel.nomeGuerra = this.requestModel.nomeGuerra.trim();
    }
    flunt.hasMinLen(
      this.requestModel.nomeGuerra,
      2,
      "nomeGuerra",
      "NOME DE GUERRA inválido"
    );
    flunt.hasMaxLen(
      this.requestModel.nomeGuerra,
      45,
      "nomeGuerra",
      "NOME DE GUERRA inválido"
    );

    flunt.hasMinLen(
      this.requestModel.idTipoCliente,
      1,
      "idTipoCliente",
      "TIPO DE CLIENTE obrigatório"
    );

    if (this.requestModel.cpfCnpj) {
      this.requestModel.cpfCnpj = getNumbersText(
        this.requestModel.cpfCnpj
      );
    }
    flunt.isNotNullOrEmpty(
      this.requestModel.cpfCnpj,
      "cpfCnpj",
      "CPF/CNPJ obrigatório"
    );

    if (Flunt.isCpf(this.requestModel.cpfCnpj))
      flunt.isCpf(this.requestModel.cpfCnpj, "cpfCnpj", "CPF invalido");
    else
      flunt.isCnpj(this.requestModel.cpfCnpj, "cpfCnpj", "CNPJ inválido");

    if (this.requestModel.logradouro) {
      this.requestModel.logradouro = this.requestModel.logradouro.trim();
    }
    flunt.hasMinLen(
      this.requestModel.logradouro,
      2,
      "logradouro",
      "LOGRADOURO inválido"
    );
    flunt.hasMaxLen(
      this.requestModel.logradouro,
      150,
      "logradouro",
      "LOGRADOURO inválido"
    );

    if (this.requestModel.cep) {
      this.requestModel.cep = getNumbersText(this.requestModel.cep);
    }
    flunt.isCep(this.requestModel.cep, "cep", "CEP inválido");

    if (this.requestModel.nomeCidade) {
      this.requestModel.nomeCidade = this.requestModel.nomeCidade.trim();
    }
    flunt.hasMinLen(
      this.requestModel.nomeCidade,
      2,
      "nomeCidade",
      "NOME CIDADE inválido"
    );
    flunt.hasMaxLen(
      this.requestModel.nomeCidade,
      150,
      "nomeCidade",
      "NOME CIDADE inválido"
    );

    if (this.requestModel.siglaUf) {
      this.requestModel.siglaUf = this.requestModel.siglaUf.trim();
    }
    flunt.isEqual(this.requestModel.siglaUf, 2, "siglaUf", "UF inválida");

    if (this.requestModel.telefone) {
      this.requestModel.telefone = this.requestModel.telefone.trim();
      this.requestModel.telefone = getNumbersText(
        this.requestModel.telefone
      );
    }
    flunt.isPhone(
      this.requestModel.telefone,
      "telefone",
      "TELEFONE inválido"
    );

    if (this.requestModel.email) {
      this.requestModel.email = this.requestModel.email.trim();
    }
    flunt.isEmail(this.requestModel.email, "email", "E-MAIL inválido");
    flunt.hasMaxLen(this.requestModel.email, 100, "email", "E-MAIL inválido");

    if (this.requestModel.tipoSanguineo) {
      this.requestModel.tipoSanguineo = this.requestModel.tipoSanguineo.trim();
    }
    flunt.hasMaxLen(
      this.requestModel.tipoSanguineo,
      10,
      "tipoSanguineo",
      "corriga TIPO SANGUÍNEO"
    );

    this.addNotifications(flunt.notifications);

    return this.isValid;
  }
}
