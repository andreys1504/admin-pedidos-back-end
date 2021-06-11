import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ValidacaoDados } from "../../../../core/helpers";
import { PedidoRepository } from "../../../../infra/data/repositories/pedido.repository";
import { Pedido } from "../../../entities";
import { CadastroPedidoRequest, ItemPedidoCadastroModel } from "./cadastro-pedido.request";

export class CadastroPedidoAppService extends AppService {
    private readonly validacaoDados = new ValidacaoDados();
    private readonly pedidoRepository = new PedidoRepository();

    async handle(request: CadastroPedidoRequest) {
        const dadosCadastro = this.validarCadastro(request);

        if (!this.validacaoDados.valido())
            return this.returnNotifications(this.validacaoDados.recuperarErros());

        let itensPedido = dadosCadastro.itensPedido.map((item: ItemPedidoCadastroModel) => {
            return {
                quantidade: item.quantidade,
                idProduto: item.idProduto,
                idSituacaoExternaItemPedido: item.idSituacaoExternaItemPedido,
                idSituacaoInternaItemPedido: item.idSituacaoInternaItemPedido,
                valorUnitario: item.valorUnitario,
                nomeFuncionarioResponsavel: item.nomeFuncionarioResponsavel
            }
        });

        const novoPedido = new Pedido();
        novoPedido.novoPedido({
            dataEmissaoPedido: dadosCadastro.dataEmissaoPedido,
            usuarioRegistroPedidoId: dadosCadastro.idUsuarioRegistroPedido,
            situacaoExternaPedidoId: dadosCadastro.idSituacaoExternaPedido,
            tipoPagamentoPedidoId: dadosCadastro.idTipoPagamento,
            clienteId: dadosCadastro.idClienteVinculadoPedido,
            tipoPedidoId: dadosCadastro.idTipoPedido,
            dataPrevisaoEntrega: dadosCadastro.dataPrevisaoEntrega,
            tamanhoItensPedido: dadosCadastro.tamanhoItensPedido,
            dataFinalizacaoPedido: dadosCadastro.dataFinalizacaoPedido,
            idUsuarioResponsavelPedido: dadosCadastro.idUsuarioResponsavelPedido,
            itensPedido: itensPedido
        });

        await this.pedidoRepository.salvarEntidade(novoPedido);
        return this.returnSuccess(novoPedido);
    }

    private validarCadastro(request: CadastroPedidoRequest) {
        const dadosCadastro = request;

        this.validacaoDados.obrigatorio(dadosCadastro.dataEmissaoPedido, 'Informe a DATA DE EMISSÃO do pedido');
        this.validacaoDados.obrigatorio(dadosCadastro.idSituacaoExternaPedido, 'Informe a SITUAÇÃO EXTERNA DO PEDIDO');
        this.validacaoDados.obrigatorio(dadosCadastro.idClienteVinculadoPedido, 'Informe um CLIENTE');
        this.validacaoDados.obrigatorio(dadosCadastro.idTipoPedido, 'Informe TIPO DE PEDIDO');

        const mensagemDadosInvalidosItensPedido = 'Informe todos os dados dos itens do pedido';
        let erroDadosItensPedidos = false;
        if (this.validacaoDados.obrigatorioColecoes(dadosCadastro.itensPedido, 'Informe ITENS para o pedido')) {
            dadosCadastro.itensPedido.forEach((item: ItemPedidoCadastroModel) => {
                if (!this.validacaoDados.obrigatorio(item.quantidade)
                    || !this.validacaoDados.obrigatorio(item.idProduto)
                    || !this.validacaoDados.obrigatorio(item.idSituacaoExternaItemPedido)
                    || !this.validacaoDados.obrigatorio(item.idSituacaoInternaItemPedido)
                    || !this.validacaoDados.obrigatorio(item.valorUnitario))
                    erroDadosItensPedidos = true;

                if (!this.validacaoDados.obrigatorio(item.valorUnitario, 'VALOR PRODUTO obrigatório')
                    || !this.validacaoDados.precoZerado(item.valorUnitario, 'VALOR PRODUTO obrigatório'))
                    erroDadosItensPedidos = true;

                if (!item.nomeFuncionarioResponsavel)
                    item.nomeFuncionarioResponsavel = null;
            });

            if (erroDadosItensPedidos)
                this.validacaoDados.adicionarMensagem(mensagemDadosInvalidosItensPedido);
        }

        if (!dadosCadastro.idTipoPagamento)
            dadosCadastro.idTipoPagamento = null;

        if (!dadosCadastro.dataPrevisaoEntrega)
            dadosCadastro.dataPrevisaoEntrega = null;
        else {
            if (new Date(dadosCadastro.dataPrevisaoEntrega).getTime() < new Date(dadosCadastro.dataEmissaoPedido).getTime())
                this.validacaoDados.adicionarMensagem('A DATA DE PREVISÃO DE ENTREGA não pode ser menor que a DATA DE EMISSÃO');
        }

        if (!dadosCadastro.dataFinalizacaoPedido)
            dadosCadastro.dataFinalizacaoPedido = null;
        else {
            if (new Date(dadosCadastro.dataFinalizacaoPedido).getTime() < new Date(dadosCadastro.dataEmissaoPedido).getTime())
                this.validacaoDados.adicionarMensagem('A DATA DE FINALIZAÇÃO não pode ser menor que a DATA DE EMISSÃO');
        }

        if (!dadosCadastro.tamanhoItensPedido)
            dadosCadastro.tamanhoItensPedido = null;

        if (!dadosCadastro.idUsuarioResponsavelPedido)
            dadosCadastro.idUsuarioResponsavelPedido = null;


        return dadosCadastro;
    }
}
