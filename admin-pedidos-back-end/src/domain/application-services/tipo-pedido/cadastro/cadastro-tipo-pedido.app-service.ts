import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ValidacaoDados } from "../../../../core/helpers";
import { TipoPedidoRepositorio } from "../../../../infra/data/repositories/tipo-pedido.repositorio";
import { TipoPedido } from "../../../entities";

export class CadastroTipoPedidoAppService extends AppService {
    private readonly tipoPedidoRepositorio = new TipoPedidoRepositorio();
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
        if (await this.tipoPedidoRepositorio.retornarEntidade(opcoesBuscaPorId))
            return this.retornoErro([{ mensagem: 'ID já existente no sistema' }]);
        
        const opcoesBuscaPorDescricao: any = {};
        opcoesBuscaPorDescricao.camposRetorno = ['id'];
        opcoesBuscaPorDescricao.filtro = { descricao: dadosCadastro.descricao };
        if (await this.tipoPedidoRepositorio.retornarEntidade(opcoesBuscaPorDescricao))
            return this.retornoErro([{ mensagem: 'DESCRIÇÃO já existente no sistema' }]);
        
        const tipoPedido = new TipoPedido();
        tipoPedido.novoTipoPedido({
            id: dadosCadastro.id,
            descricao: dadosCadastro.descricao,
            ativo: dadosCadastro.ativo
        })
        await this.tipoPedidoRepositorio.salvarEntidade(tipoPedido);

        return this.retornoSucesso(tipoPedido);
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
