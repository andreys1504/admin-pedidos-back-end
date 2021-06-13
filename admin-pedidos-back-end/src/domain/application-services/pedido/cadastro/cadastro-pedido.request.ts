import { RequestAppService } from "../../../../core/domain/application-services/request/request-app-service";
import { Flunt } from "../../../../core/validations/flunt";

export class CadastroPedidoRequest extends RequestAppService {
  constructor(
    public requestModel: {
      idTipoPedido: number;
      dataEmissaoPedido: string;
      idSituacaoExternaPedido: number;
      idTipoPagamento: number | null;
      idClienteVinculadoPedido: number;
      itensPedido: ItemPedidoCadastroModel[];
      dataPrevisaoEntrega: string | null;
      observacoes: string | null;
      dataFinalizacaoPedido: string | null;
      idUsuarioResponsavelPedido: number | null;
      idUsuarioRegistroPedido: number;
    }
  ) {
    super();
  }

  validate(): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(
      this.requestModel.idTipoPedido,
      1,
      "idTipoPedido",
      "Informe TIPO DE PEDIDO"
    );

    if (this.requestModel.dataEmissaoPedido) {
      this.requestModel.dataEmissaoPedido =
        this.requestModel.dataEmissaoPedido.trim();
    }
    flunt.isNotNullOrEmpty(
      this.requestModel.dataEmissaoPedido,
      "dataEmissaoPedido",
      "Informe a DATA DE EMISSÃO do pedido"
    );

    flunt.hasMinLen(
      this.requestModel.idSituacaoExternaPedido,
      1,
      "idSituacaoExternaPedido",
      "Informe a SITUAÇÃO EXTERNA DO PEDIDO"
    );

    if (!this.requestModel.idTipoPagamento) {
      this.requestModel.idTipoPagamento = null;
    }

    flunt.hasMinLen(
      this.requestModel.idClienteVinculadoPedido,
      1,
      "idClienteVinculadoPedido",
      "Informe um CLIENTE"
    );

    const mensagemDadosInvalidosItensPedido =
      "Informe todos os dados dos itens do pedido";
    let erroItensPedidos = false;

    if (
      flunt.isRequiredCollection(
        this.requestModel.itensPedido,
        "itensPedido",
        "Informe ITENS para o pedido"
      )
    ) {
      this.requestModel.itensPedido.forEach((item: ItemPedidoCadastroModel) => {
        if (
          !flunt.isRequired(item.quantidade) ||
          !flunt.isRequired(item.idProduto) ||
          !flunt.isRequired(item.idSituacaoExternaItemPedido) ||
          !flunt.isRequired(item.idSituacaoInternaItemPedido) ||
          !flunt.isRequired(item.valorUnitario)
        ) {
          erroItensPedidos = true;
        }

        if (
          !flunt.isRequired(item.valorUnitario, "VALOR PRODUTO obrigatório") ||
          !flunt.emptyMoney(
            item.valorUnitario,
            "valorUnitario",
            "VALOR PRODUTO obrigatório"
          )
        ) {
          erroItensPedidos = true;
        }

        if (!item.nomeFuncionarioResponsavel) {
          item.nomeFuncionarioResponsavel = null;
        }
      });

      if (erroItensPedidos) {
        this.addNotification("itensPedido", mensagemDadosInvalidosItensPedido);
      }
    }

    if (!this.requestModel.dataPrevisaoEntrega) {
      this.requestModel.dataPrevisaoEntrega = null;
    } else {
      if (
        new Date(this.requestModel.dataPrevisaoEntrega).getTime() <
        new Date(this.requestModel.dataEmissaoPedido).getTime()
      ) {
        this.addNotification(
          "dataPrevisaoEntrega",
          "A DATA DE PREVISÃO DE ENTREGA não pode ser menor que a DATA DE EMISSÃO"
        );
      }
    }

    if (!this.requestModel.dataFinalizacaoPedido) {
      this.requestModel.dataFinalizacaoPedido = null;
    } else {
      if (
        new Date(this.requestModel.dataFinalizacaoPedido).getTime() <
        new Date(this.requestModel.dataEmissaoPedido).getTime()
      ) {
        this.addNotification(
          "dataFinalizacaoPedido",
          "A DATA DE FINALIZAÇÃO não pode ser menor que a DATA DE EMISSÃO"
        );
      }
    }

    if (this.requestModel.observacoes) {
      this.requestModel.observacoes = this.requestModel.observacoes.trim();
    }
    flunt.isBetween(
      this.requestModel.observacoes,
      5,
      300,
      "observacoes",
      "Observações inválidas"
    );

    if (!this.requestModel.idUsuarioResponsavelPedido) {
      this.requestModel.idUsuarioResponsavelPedido = null;
    }

    this.addNotifications(flunt.notifications);

    return this.isValid;
  }
}

export interface ItemPedidoCadastroModel {
  quantidade: number;
  idProduto: number;
  idSituacaoInternaItemPedido: number;
  idSituacaoExternaItemPedido: number;
  valorUnitario: string;
  nomeFuncionarioResponsavel: string | null;
}
