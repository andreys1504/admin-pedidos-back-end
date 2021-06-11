import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ValidacaoDados } from "../../../../core/helpers";
import { SituacaoInternaItemPedidoRepositorio } from "../../../../infra/data/repositories/situacao-interna-item-pedido.repositorio";
import { SituacaoInternaItemPedido } from "../../../entities";

export class CadastroSituacaoInternaItemPedidoAppService extends AppService {
    private readonly situacaoInternaItemRepositorio = new SituacaoInternaItemPedidoRepositorio();
    private readonly validacaoDados = new ValidacaoDados();

    async executar(model: {
        id: number;
        descricao: string;
        ativo: boolean;
    }) {
        const dadosCadastro = this.validarCadastro(model);

        if (!this.validacaoDados.valido())
            return this.retornoErro(this.validacaoDados.recuperarErros());
        
        const opcoesBuscaPorId: any = {};
        opcoesBuscaPorId.camposRetorno = ['id'];
        opcoesBuscaPorId.filtro = { id: dadosCadastro.id };
        if (await this.situacaoInternaItemRepositorio.retornarEntidade(opcoesBuscaPorId))
            return this.retornoErro([{ mensagem: 'ID já existente no sistema' }]);
        
        const opcoesBuscaPorDescricao: any = {};
        opcoesBuscaPorDescricao.camposRetorno = ['id'];
        opcoesBuscaPorDescricao.filtro = { descricao: dadosCadastro.descricao };
        if (await this.situacaoInternaItemRepositorio.retornarEntidade(opcoesBuscaPorDescricao))
            return this.retornoErro([{ mensagem: 'DESCRIÇÃO já existente no sistema' }]);
        
        const situacaoInternaItemPedido = new SituacaoInternaItemPedido();
        situacaoInternaItemPedido.novaSituacaoInternaItemPedido({
            id: dadosCadastro.id,
            descricao: dadosCadastro.descricao,
            ativo: dadosCadastro.ativo
        })
        await this.situacaoInternaItemRepositorio.salvarEntidade(situacaoInternaItemPedido);

        return this.retornoSucesso(situacaoInternaItemPedido);
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
