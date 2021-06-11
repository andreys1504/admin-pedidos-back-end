import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ValidacaoDados } from "../../../../core/helpers";
import { TipoPagamentoRepositorio } from "../../../../infra/data/repositories/tipo-pagamento-pedido.repositorio";
import { TipoPagamentoPedido } from "../../../entities";

export class CadastroTipoPagamentoPedidoAppService extends AppService {
    private readonly tipoPagamentoRepositorio = new TipoPagamentoRepositorio();
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
        if (await this.tipoPagamentoRepositorio.retornarEntidade(opcoesBuscaPorId))
            return this.retornoErro([{ mensagem: 'ID já existente no sistema' }]);
        
        const opcoesBuscaPorDescricao: any = {};
        opcoesBuscaPorDescricao.camposRetorno = ['id'];
        opcoesBuscaPorDescricao.filtro = { descricao: dadosCadastro.descricao };
        if (await this.tipoPagamentoRepositorio.retornarEntidade(opcoesBuscaPorDescricao))
            return this.retornoErro([{ mensagem: 'DESCRIÇÃO já existente no sistema' }]);
        
        const tipoPagamento = new TipoPagamentoPedido();
        tipoPagamento.novoTipoPagamento({
            id: dadosCadastro.id,
            descricao: dadosCadastro.descricao,
            ativo: dadosCadastro.ativo
        })
        await this.tipoPagamentoRepositorio.salvarEntidade(tipoPagamento);

        return this.retornoSucesso(tipoPagamento);
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
