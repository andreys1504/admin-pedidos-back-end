import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ValidacaoDados } from "../../../../core/helpers";
import { SituacaoExternaItemPedidoRepositorio } from "../../../../infra/data/repositories/situacao-externa-item-pedido.repositorio";
import { SituacaoExternaItemPedido } from "../../../entities";


export class CadastroSituacaoExternaItemPedidoAppService extends AppService {
    private readonly situacaoExternaItemRepositorio = new SituacaoExternaItemPedidoRepositorio();
    private readonly validacaoDados = new ValidacaoDados();

    async executar(model: {
        id: number;
        descricao: string;
        ativo: boolean;
    }) {
        const dadosCadastro = this.validarCadastro(model);

        if (!this.validacaoDados.valido())
            return this.retornoErro(this.validacaoDados.recuperarErros());

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
        this.validacaoDados.obrigatorio(dadosCadastro.id, 'ID obrigatório');
        this.validacaoDados.menorMaior(dadosCadastro.id, 1, 999, 'ID inválido');

        this.validacaoDados.obrigatorio(dadosCadastro.descricao, 'DESCRIÇÃO obrigatória');
        this.validacaoDados.tamanhoMinimo(dadosCadastro.descricao, 2, 'DESCRIÇÃO inválida');
        this.validacaoDados.tamanhoMaximo(dadosCadastro.descricao, 45, 'DESCRIÇÃO inválida');

        this.validacaoDados.obrigatorio(dadosCadastro.ativo, 'ATIVO obrigatório');

        return dadosCadastro;
    }
}
