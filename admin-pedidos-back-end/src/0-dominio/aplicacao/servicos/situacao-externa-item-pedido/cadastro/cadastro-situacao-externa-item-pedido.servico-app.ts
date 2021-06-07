import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { ValidacaoDados } from "../../../../../0-core/helpers";
import { SituacaoExternaItemPedidoRepositorio } from "../../../../repositorios/situacao-externa-item-pedido.repositorio";
import { SituacaoExternaItemPedido } from "../../../../entidades";

export class CadastroSituacaoExternaItemPedidoServicoApp extends ServicoAplicacao {
    private readonly situacaoExternaItemRepositorio = new SituacaoExternaItemPedidoRepositorio();
    private readonly _validacaoDados = new ValidacaoDados();

    async executar(model: {
        id: number;
        descricao: string;
        ativo: boolean;
    }) {
        const dadosCadastro = this.validarCadastro(model);

        if (!this._validacaoDados.valido())
            return this.retornoErro(this._validacaoDados.recuperarErros());

        let opcoesBuscaPorId: any = {};
        opcoesBuscaPorId.camposRetorno = ['id'];
        opcoesBuscaPorId.filtro = { id: dadosCadastro.id };
        if (await this.situacaoExternaItemRepositorio.retornarEntidade(opcoesBuscaPorId))
            return this.retornoErro([{ mensagem: 'ID já existente no sistema' }]);

        let opcoesBuscaPorDescricao: any = {};
        opcoesBuscaPorDescricao.camposRetorno = ['id'];
        opcoesBuscaPorDescricao.filtro = { descricao: dadosCadastro.descricao };
        if (await this.situacaoExternaItemRepositorio.retornarEntidade(opcoesBuscaPorDescricao))
            return this.retornoErro([{ mensagem: 'DESCRIÇÃO já existente no sistema' }]);

        const situacaoExternaItemPedido = new SituacaoExternaItemPedido();
        situacaoExternaItemPedido.novaSituacaoExternaItemPedido({
            id: dadosCadastro.id,
            descricao: dadosCadastro.descricao,
            ativo: dadosCadastro.ativo
        })
        await this.situacaoExternaItemRepositorio.salvarEntidade(situacaoExternaItemPedido);

        return this.retornoSucesso(situacaoExternaItemPedido);
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