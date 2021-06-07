import { CadastroPedidoViewModelServicoApp, ItemPedidoCadastroModel } from "./cadastro-pedido.view-model.servico-app";
import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { ValidacaoDados } from "../../../../../0-core/helpers";
import { Pedido } from "../../../../entidades";
import { PedidoRepositorio } from "../../../../repositorios/pedido.repositorio";

export class CadastroPedidoServicoApp extends ServicoAplicacao {
    private readonly _validacaoDados = new ValidacaoDados();
    private readonly _pedidoRepositorio = new PedidoRepositorio();

    async executar(model: CadastroPedidoViewModelServicoApp) {
        const dadosCadastro = this.validarCadastro(model);

        if (!this._validacaoDados.valido())
            return this.retornoErro(this._validacaoDados.recuperarErros());

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

        await this._pedidoRepositorio.salvarEntidade(novoPedido);
        return this.retornoSucesso(novoPedido);
    }

    private validarCadastro(model: CadastroPedidoViewModelServicoApp) {
        const dadosCadastro = model;

        this._validacaoDados.obrigatorio(dadosCadastro.dataEmissaoPedido, 'Informe a DATA DE EMISSÃO do pedido');
        this._validacaoDados.obrigatorio(dadosCadastro.idSituacaoExternaPedido, 'Informe a SITUAÇÃO EXTERNA DO PEDIDO');
        this._validacaoDados.obrigatorio(dadosCadastro.idClienteVinculadoPedido, 'Informe um CLIENTE');
        this._validacaoDados.obrigatorio(dadosCadastro.idTipoPedido, 'Informe TIPO DE PEDIDO');

        const mensagemDadosInvalidosItensPedido = 'Informe todos os dados dos itens do pedido';
        let erroDadosItensPedidos = false;
        if (this._validacaoDados.obrigatorioColecoes(dadosCadastro.itensPedido, 'Informe ITENS para o pedido')) {
            dadosCadastro.itensPedido.forEach((item: ItemPedidoCadastroModel) => {
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

        if (!dadosCadastro.idTipoPagamento)
            dadosCadastro.idTipoPagamento = null;

        if (!dadosCadastro.dataPrevisaoEntrega)
            dadosCadastro.dataPrevisaoEntrega = null;
        else {
            if (new Date(dadosCadastro.dataPrevisaoEntrega).getTime() < new Date(dadosCadastro.dataEmissaoPedido).getTime())
                this._validacaoDados.adicionarMensagem('A DATA DE PREVISÃO DE ENTREGA não pode ser menor que a DATA DE EMISSÃO');
        }

        if (!dadosCadastro.dataFinalizacaoPedido)
            dadosCadastro.dataFinalizacaoPedido = null;
        else {
            if (new Date(dadosCadastro.dataFinalizacaoPedido).getTime() < new Date(dadosCadastro.dataEmissaoPedido).getTime())
                this._validacaoDados.adicionarMensagem('A DATA DE FINALIZAÇÃO não pode ser menor que a DATA DE EMISSÃO');
        }

        if (!dadosCadastro.tamanhoItensPedido)
            dadosCadastro.tamanhoItensPedido = null;

        if (!dadosCadastro.idUsuarioResponsavelPedido)
            dadosCadastro.idUsuarioResponsavelPedido = null;


        return dadosCadastro;
    }
}