import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { ValidacaoDados } from "../../../../../0-core/helpers";
import { SituacaoExternaPedidoRepositorio } from "../../../../repositorios/situacao-externa-pedido.repositorio";
import { SituacaoExternaPedido } from "../../../../entidades";

export class CadastroSituacaoExternaPedidoServicoApp extends ServicoAplicacao {
    private readonly _situacaoExternaRepositorio = new SituacaoExternaPedidoRepositorio();
    private readonly _validacaoDados = new ValidacaoDados();

    async executar(model: {
        id: number;
        descricao: string;
        ativo: boolean
    }) {
        const dadosCadastro = this.validarCadastro(model);

        if (!this._validacaoDados.valido())
            return this.retornoErro(this._validacaoDados.recuperarErros());
        
        const opcoesBuscaPorId: any = {};
        opcoesBuscaPorId.filtro = { id: dadosCadastro.id };
        if (await this._situacaoExternaRepositorio.retornarEntidade(opcoesBuscaPorId))
            return this.retornoErro([{ mensagem: 'ID já existente no sistema' }]);

        const opcoesBuscaPorDescricao: any = {};
        opcoesBuscaPorDescricao.filtro = { descricao: dadosCadastro.descricao }
        if (await this._situacaoExternaRepositorio.retornarColecaoEntidade(opcoesBuscaPorDescricao))
            return this.retornoErro([{ mensagem: 'DESCRIÇÃO já existente no sistema' }]);

        const situacaoExternaPedido = new SituacaoExternaPedido();
        situacaoExternaPedido.novaSituacaoExternaPedido({
            id: dadosCadastro.id,
            descricao: dadosCadastro.descricao,
            ativo: dadosCadastro.ativo
        })
        await this._situacaoExternaRepositorio.salvarEntidade(situacaoExternaPedido);

        return this.retornoSucesso(situacaoExternaPedido);
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