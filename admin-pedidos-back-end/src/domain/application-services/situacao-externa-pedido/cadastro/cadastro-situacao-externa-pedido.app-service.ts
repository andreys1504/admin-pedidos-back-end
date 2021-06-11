import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ValidacaoDados } from "../../../../core/helpers";
import { SituacaoExternaPedidoRepositorio } from "../../../../infra/data/repositories/situacao-externa-pedido.repositorio";
import { SituacaoExternaPedido } from "../../../entities";

export class CadastroSituacaoExternaPedidoAppService extends AppService {
    private readonly situacaoExternaRepositorio = new SituacaoExternaPedidoRepositorio();
    private readonly validacaoDados = new ValidacaoDados();

    async executar(model: {
        id: number;
        descricao: string;
        ativo: boolean
    }) {
        const dadosCadastro = this.validarCadastro(model);

        if (!this.validacaoDados.valido())
            return this.retornoErro(this.validacaoDados.recuperarErros());
        
        const opcoesBuscaPorId: any = {};
        opcoesBuscaPorId.filtro = { id: dadosCadastro.id };
        if (await this.situacaoExternaRepositorio.retornarEntidade(opcoesBuscaPorId))
            return this.retornoErro([{ mensagem: 'ID já existente no sistema' }]);

        const opcoesBuscaPorDescricao: any = {};
        opcoesBuscaPorDescricao.filtro = { descricao: dadosCadastro.descricao }
        if (await this.situacaoExternaRepositorio.retornarColecaoEntidade(opcoesBuscaPorDescricao))
            return this.retornoErro([{ mensagem: 'DESCRIÇÃO já existente no sistema' }]);

        const situacaoExternaPedido = new SituacaoExternaPedido();
        situacaoExternaPedido.novaSituacaoExternaPedido({
            id: dadosCadastro.id,
            descricao: dadosCadastro.descricao,
            ativo: dadosCadastro.ativo
        })
        await this.situacaoExternaRepositorio.salvarEntidade(situacaoExternaPedido);

        return this.retornoSucesso(situacaoExternaPedido);
    }

    private validarCadastro(dadosCadastro: {
        id: number;
        descricao: string;
        ativo: boolean;
    }) {
        this.validacaoDados.obrigatorio(dadosCadastro.id, 'ID obrigatório');
        this.validacaoDados.menorMaior(dadosCadastro.id, 1, 999, 'ID inválido');

        this.validacaoDados.obrigatorio(dadosCadastro.descricao, 'DESCRIÇÃO obrigatória');
        this.validacaoDados.tamanhoMinimo(dadosCadastro.descricao, 2, 'DESCRIÇÃO inválida');
        this.validacaoDados.tamanhoMaximo(dadosCadastro.descricao, 45, 'DESCRIÇÃO inválida');

        this.validacaoDados.obrigatorio(dadosCadastro.ativo, 'ATIVO obrigatório');

        return dadosCadastro;
    }
}
