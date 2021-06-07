import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { EdicaoPedidoViewModelServicoApp, ItemPedidoEdicaoModel } from "./edicao-pedido.view-model.servico-app";
import { ValidacaoDados } from "../../../../../0-core/helpers";
import { PedidoItem } from "../../../../entidades";
import { PedidoRepositorio } from "../../../../repositorios/pedido.repositorio";
import { PedidosParaTratamentoServicoApp } from "../pedidos-para-tratamento/pedidos-para-tratamento.servico-app";

export class EdicaoPedidoServicoApp extends ServicoAplicacao {
    private readonly _validacaoDados = new ValidacaoDados();
    private readonly _pedidoRepositorio = new PedidoRepositorio();
    private readonly _pedidosParaTratamentoServicoApp = new PedidosParaTratamentoServicoApp();

    async executar(model: EdicaoPedidoViewModelServicoApp) {
        const dadosEdicao = this.validarEdicaoPedido(model);

        if (!this._validacaoDados.valido())
            return this.retornoErro(this._validacaoDados.recuperarErros());

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
        const pedidoParaEdicao = await this._pedidoRepositorio.retornarEntidade(opcoesBuscaPedido);
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

        await this._pedidoRepositorio.editar({ pedido: pedidoParaEdicao, pedidoItens: itensPedido });

        const pedidoEditado = await this._pedidosParaTratamentoServicoApp.executar({
            idPedido: pedidoParaEdicao.id,
            cpfCnpj: undefined,
            dataEmissaoPedido: undefined,
            pedidosPendentes: undefined,
            idUsuarioResponsavelPedido: undefined,
            pedidoRealizadoLojaVirtual: false
        });

        return this.retornoSucesso(pedidoEditado.dados[0]);
    }

    private validarEdicaoPedido(dadosEdicao: EdicaoPedidoViewModelServicoApp) {
        if (!dadosEdicao.idPedido || dadosEdicao.idPedido === 0)
            throw new Error('PEDIDO inválido');

        this._validacaoDados.obrigatorio(dadosEdicao.dataEmissaoPedido, 'Informe a DATA DE EMISSÃO do pedido');
        this._validacaoDados.obrigatorio(dadosEdicao.idSituacaoExternaPedido, 'Informe a SITUAÇÃO EXTERNA DO PEDIDO');
        this._validacaoDados.obrigatorio(dadosEdicao.idClienteVinculadoPedido, 'Informe um CLIENTE');
        this._validacaoDados.obrigatorio(dadosEdicao.idTipoPedido, 'Informe TIPO DE PEDIDO');

        const mensagemDadosInvalidosItensPedido = 'Informe todos os dados dos itens do pedido';
        let erroDadosItensPedidos = false;
        if (this._validacaoDados.obrigatorioColecoes(dadosEdicao.itensPedido, 'Informe ITENS para o pedido')) {
            dadosEdicao.itensPedido.forEach((item: ItemPedidoEdicaoModel) => {
                if (!this._validacaoDados.obrigatorio(item.quantidade)
                    || !this._validacaoDados.obrigatorio(item.idProduto)
                    || !this._validacaoDados.obrigatorio(item.idSituacaoExternaItemPedido)
                    || !this._validacaoDados.obrigatorio(item.idSituacaoInternaItemPedido)
                    || !this._validacaoDados.obrigatorio(item.valorUnitario))
                    erroDadosItensPedidos = true;

                if (!this._validacaoDados.obrigatorio(item.valorUnitario, 'VALOR PRODUTO obrigatório')
                    || !this._validacaoDados.precoZerado(item.valorUnitario, 'VALOR PRODUTO obrigatório'))
                    erroDadosItensPedidos = true;

                if (!item.nomeFuncionarioResponsavel)
                    item.nomeFuncionarioResponsavel = null;
            });

            if (erroDadosItensPedidos)
                this._validacaoDados.adicionarMensagem(mensagemDadosInvalidosItensPedido);
        }

        if (!dadosEdicao.idTipoPagamento)
            dadosEdicao.idTipoPagamento = null;

        if (!dadosEdicao.dataPrevisaoEntrega)
            dadosEdicao.dataPrevisaoEntrega = null;
        else {
            if (new Date(dadosEdicao.dataPrevisaoEntrega).getTime() < new Date(dadosEdicao.dataEmissaoPedido).getTime())
                this._validacaoDados.adicionarMensagem('A DATA DE PREVISÃO DE ENTREGA não pode ser menor que a DATA DE EMISSÃO');
        }

        if (!dadosEdicao.dataFinalizacaoPedido)
            dadosEdicao.dataFinalizacaoPedido = null;
        else {
            if (new Date(dadosEdicao.dataFinalizacaoPedido).getTime() < new Date(dadosEdicao.dataEmissaoPedido).getTime())
                this._validacaoDados.adicionarMensagem('A DATA DE FINALIZAÇÃO não pode ser menor que a DATA DE EMISSÃO');
        }

        if (!dadosEdicao.tamanhoItensPedido)
            dadosEdicao.tamanhoItensPedido = null;

        if (!dadosEdicao.idUsuarioResponsavelPedido)
            dadosEdicao.idUsuarioResponsavelPedido = null;


        return dadosEdicao;
    }
}