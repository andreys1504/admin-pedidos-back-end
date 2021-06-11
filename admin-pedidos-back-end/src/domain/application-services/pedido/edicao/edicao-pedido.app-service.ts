import { EdicaoPedidoRequest, ItemPedidoEdicaoModel } from "./edicao-pedido.request";
import { PedidosParaTratamentoAppService } from "../pedidos-para-tratamento/pedidos-para-tratamento.app-service";
import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ValidacaoDados } from "../../../../core/helpers";
import { PedidoRepository } from "../../../../infra/data/repositories/pedido.repository";
import { PedidoItem } from "../../../entities";

export class EdicaoPedidoAppService extends AppService {
    private readonly validacaoDados = new ValidacaoDados();
    private readonly pedidoRepository = new PedidoRepository();
    private readonly pedidosParaTratamentoAppService = new PedidosParaTratamentoAppService();

    async handle(request: EdicaoPedidoRequest) {
        const dadosEdicao = this.validarEdicaoPedido(request);

        if (!this.validacaoDados.valido())
            return this.returnNotifications(this.validacaoDados.recuperarErros());

        let itensPedido = dadosEdicao.itensPedido.map((item: ItemPedidoEdicaoModel) => {
            const pedidoItem = new PedidoItem();
            pedidoItem.novoPedidoItem({
                id: null,
                idPedido: dadosEdicao.idPedido,
                idProduto: item.idProduto,
                quantidade: item.quantidade,
                idSituacaoInternaItemPedido: item.idSituacaoInternaItemPedido,
                idSituacaoExternaItemPedido: item.idSituacaoExternaItemPedido,
                valorUnitario: item.valorUnitario,
                nomeFuncionarioResponsavel: item.nomeFuncionarioResponsavel
            });

            return pedidoItem;
        });

        const opcoesBuscaPedido: any = {
            filtro: { id: dadosEdicao.idPedido }
        };
        const pedidoParaEdicao = await this.pedidoRepository.retornarEntidade(opcoesBuscaPedido);
        if (!pedidoParaEdicao)
            throw new Error('PEDIDO inválido');

        pedidoParaEdicao.editar({
            idTipoPedido: dadosEdicao.idTipoPedido,
            dataEmissaoPedido: dadosEdicao.dataEmissaoPedido,
            idSituacaoExternaPedido: dadosEdicao.idSituacaoExternaPedido,
            idTipoPagamento: dadosEdicao.idTipoPagamento,
            dataPrevisaoEntrega: dadosEdicao.dataPrevisaoEntrega,
            dataFinalizacaoPedido: dadosEdicao.dataFinalizacaoPedido,
            idClienteVinculadoPedido: dadosEdicao.idClienteVinculadoPedido,
            tamanhoItensPedido: dadosEdicao.tamanhoItensPedido,
            idUsuarioResponsavelPedido: dadosEdicao.idUsuarioResponsavelPedido
        });

        await this.pedidoRepository.editar({ pedido: pedidoParaEdicao, pedidoItens: itensPedido });

        const pedidoEditado = await this.pedidosParaTratamentoAppService.handle({
            idPedido: pedidoParaEdicao.id,
            cpfCnpj: undefined,
            dataEmissaoPedido: undefined,
            pedidosPendentes: undefined,
            idUsuarioResponsavelPedido: undefined,
            pedidoRealizadoLojaVirtual: false
        });

        return this.returnSuccess(pedidoEditado.data[0]);
    }

    private validarEdicaoPedido(dadosEdicao: EdicaoPedidoRequest) {
        if (!dadosEdicao.idPedido || dadosEdicao.idPedido === 0)
            throw new Error('PEDIDO inválido');

        this.validacaoDados.obrigatorio(dadosEdicao.dataEmissaoPedido, 'Informe a DATA DE EMISSÃO do pedido');
        this.validacaoDados.obrigatorio(dadosEdicao.idSituacaoExternaPedido, 'Informe a SITUAÇÃO EXTERNA DO PEDIDO');
        this.validacaoDados.obrigatorio(dadosEdicao.idClienteVinculadoPedido, 'Informe um CLIENTE');
        this.validacaoDados.obrigatorio(dadosEdicao.idTipoPedido, 'Informe TIPO DE PEDIDO');

        const mensagemDadosInvalidosItensPedido = 'Informe todos os dados dos itens do pedido';
        let erroDadosItensPedidos = false;
        if (this.validacaoDados.obrigatorioColecoes(dadosEdicao.itensPedido, 'Informe ITENS para o pedido')) {
            dadosEdicao.itensPedido.forEach((item: ItemPedidoEdicaoModel) => {
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

        if (!dadosEdicao.idTipoPagamento)
            dadosEdicao.idTipoPagamento = null;

        if (!dadosEdicao.dataPrevisaoEntrega)
            dadosEdicao.dataPrevisaoEntrega = null;
        else {
            if (new Date(dadosEdicao.dataPrevisaoEntrega).getTime() < new Date(dadosEdicao.dataEmissaoPedido).getTime())
                this.validacaoDados.adicionarMensagem('A DATA DE PREVISÃO DE ENTREGA não pode ser menor que a DATA DE EMISSÃO');
        }

        if (!dadosEdicao.dataFinalizacaoPedido)
            dadosEdicao.dataFinalizacaoPedido = null;
        else {
            if (new Date(dadosEdicao.dataFinalizacaoPedido).getTime() < new Date(dadosEdicao.dataEmissaoPedido).getTime())
                this.validacaoDados.adicionarMensagem('A DATA DE FINALIZAÇÃO não pode ser menor que a DATA DE EMISSÃO');
        }

        if (!dadosEdicao.tamanhoItensPedido)
            dadosEdicao.tamanhoItensPedido = null;

        if (!dadosEdicao.idUsuarioResponsavelPedido)
            dadosEdicao.idUsuarioResponsavelPedido = null;


        return dadosEdicao;
    }
}
