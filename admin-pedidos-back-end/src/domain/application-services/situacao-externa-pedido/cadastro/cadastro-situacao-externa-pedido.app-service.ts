import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ValidacaoDados } from "../../../../core/helpers";
import { SituacaoExternaPedidoRepository } from "../../../../infra/data/repositories/situacao-externa-pedido.repository";
import { SituacaoExternaPedido } from "../../../entities";

export class CadastroSituacaoExternaPedidoAppService extends AppService {
    private readonly situacaoExternaRepository = new SituacaoExternaPedidoRepository();
    private readonly validacaoDados = new ValidacaoDados();

    async handle(model: {
        id: number;
        descricao: string;
        ativo: boolean
    }) {
        const dadosCadastro = this.validarCadastro(model);

        if (!this.validacaoDados.valido())
            return this.returnNotifications(this.validacaoDados.recuperarErros());
        
        const opcoesBuscaPorId: any = {};
        opcoesBuscaPorId.filtro = { id: dadosCadastro.id };
        if (await this.situacaoExternaRepository.retornarEntidade(opcoesBuscaPorId))
            return this.returnNotifications([{ mensagem: 'ID já existente no sistema' }]);

        const opcoesBuscaPorDescricao: any = {};
        opcoesBuscaPorDescricao.filtro = { descricao: dadosCadastro.descricao }
        if (await this.situacaoExternaRepository.retornarColecaoEntidade(opcoesBuscaPorDescricao))
            return this.returnNotifications([{ mensagem: 'DESCRIÇÃO já existente no sistema' }]);

        const situacaoExternaPedido = new SituacaoExternaPedido();
        situacaoExternaPedido.novaSituacaoExternaPedido({
            id: dadosCadastro.id,
            descricao: dadosCadastro.descricao,
            ativo: dadosCadastro.ativo
        })
        await this.situacaoExternaRepository.salvarEntidade(situacaoExternaPedido);

        return this.returnSuccess(situacaoExternaPedido);
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
