import { RequestAppService } from "../../../../core/domain/application-services/request/request-app-service";
import { Flunt } from "../../../../core/validations/flunt";

export class EdicaoProdutoRequest extends RequestAppService {
  constructor(
    public requestModel: {
      detalhesProduto: string;
      imagensDestaqueOriginais: string[];
      novasImagensDestaqueEmBase64: string[];
      destaqueTelaPrincipal: boolean;
      descricao: string;
      valorUnitario: string;
      idTipoProduto: number;
      idProduto: number;
      demaisImagensOriginais: string[];
      novasDemaisImagensEmBase64: string[];
    }
  ) {
    super();
  }

  validate(): boolean {
    const flunt = new Flunt();

    if (this.requestModel.descricao) {
      this.requestModel.descricao = this.requestModel.descricao.trim();
    }
    flunt.isNotNullOrEmpty(
      this.requestModel.descricao,
      "descricao",
      "DESCRIÇÃO obrigatória"
    );
    flunt.hasMinLen(
      this.requestModel.descricao,
      3,
      "descricao",
      "DESCRIÇÃO inválida"
    );
    flunt.hasMaxLen(
      this.requestModel.descricao,
      65,
      "descricao",
      "DESCRIÇÃO inválida"
    );

    if (this.requestModel.detalhesProduto) {
      this.requestModel.detalhesProduto =
        this.requestModel.detalhesProduto.trim();
    }
    flunt.hasMinLen(
      this.requestModel.detalhesProduto,
      5,
      "detalhesProduto",
      "DESTALHES inválido"
    );

    if (this.requestModel.valorUnitario) {
      this.requestModel.valorUnitario = this.requestModel.valorUnitario.trim();
      this.requestModel.valorUnitario = this.requestModel.valorUnitario
        .replace(".", "")
        .replace(",", ".");
    }
    flunt.isNotNullOrEmpty(
      this.requestModel.valorUnitario,
      "valorUnitario",
      "VALOR obrigatório"
    );
    flunt.emptyMoney(
      this.requestModel.valorUnitario,
      "valorUnitario",
      "VALOR obrigatório"
    );

    flunt.hasMinLen(
      this.requestModel.idTipoProduto,
      1,
      "idTipoProduto",
      "Informe CATEGORIA"
    );

    this.addNotifications(flunt.notifications);

    return this.isValid;
  }
}
