import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { TipoPagamentoRepositorio } from "../../../../repositorios/tipo-pagamento-pedido.repositorio";
import { ValidacaoDados } from "../../../../../0-core/helpers";
import { TipoPagamentoPedido } from "../../../../entidades";

export class CadastroTipoPagamentoPedidoServicoApp extends ServicoAplicacao {
    private readonly _tipoPagamentoRepositorio = new TipoPagamentoRepositorio();
    private readonly _validacaoDados = new ValidacaoDados();

    async executar(model: {
        id: number;
        descricao: string;
        ativo: boolean;
    }) {
        const dadosCadastro = this.validarCadastro(model);

        if (!this._validacaoDados.valido()) 
            return this.retornoErro(this._validacaoDados.recuperarErros());
        
        const opcoesBuscaPorId: any = {};
        opcoesBuscaPorId.camposRetorno = ['id'];
        opcoesBuscaPorId.filtro = { id: dadosCadastro.id };
        if (await this._tipoPagamentoRepositorio.retornarEntidade(opcoesBuscaPorId))
            return this.retornoErro([{ mensagem: 'ID já existente no sistema' }]);
        
        const opcoesBuscaPorDescricao: any = {};
        opcoesBuscaPorDescricao.camposRetorno = ['id'];
        opcoesBuscaPorDescricao.filtro = { descricao: dadosCadastro.descricao };
        if (await this._tipoPagamentoRepositorio.retornarEntidade(opcoesBuscaPorDescricao))
            return this.retornoErro([{ mensagem: 'DESCRIÇÃO já existente no sistema' }]);
        
        const tipoPagamento = new TipoPagamentoPedido();
        tipoPagamento.novoTipoPagamento({
            id: dadosCadastro.id,
            descricao: dadosCadastro.descricao,
            ativo: dadosCadastro.ativo
        })
        await this._tipoPagamentoRepositorio.salvarEntidade(tipoPagamento);

        return this.retornoSucesso(tipoPagamento);
    }

    private validarCadastro(dadosCadastro: {
        id: number;
        descricao: string;
        ativo: boolean;
    }) {
        this._validacaoDados.obrigatorio(dadosCadastro.id, 'ID obrigatório');
        this._validacaoDados.menorMaior(dadosCadastro.id, 1, 999, 'ID inválido');

        this._validacaoDados.obrigatorio(dadosCadastro.descricao, 'DESCRIÇÃO obrigatória');
        this._validacaoDados.tamanhoMinimo(dadosCadastro.descricao, 2, 'DESCRIÇÃO inválida');
        this._validacaoDados.tamanhoMaximo(dadosCadastro.descricao, 45, 'DESCRIÇÃO inválida');

        this._validacaoDados.obrigatorio(dadosCadastro.ativo, 'ATIVO obrigatório');

        return dadosCadastro;
    }
}