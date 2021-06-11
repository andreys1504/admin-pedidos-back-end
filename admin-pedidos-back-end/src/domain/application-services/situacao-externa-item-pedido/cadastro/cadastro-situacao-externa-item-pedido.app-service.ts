import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ValidacaoDados } from "../../../../core/helpers";
import { SituacaoExternaItemPedidoRepository } from "../../../../infra/data/repositories/situacao-externa-item-pedido.repository";
import { SituacaoExternaItemPedido } from "../../../entities";

export class CadastroSituacaoExternaItemPedidoAppService extends AppService {
    private readonly situacaoExternaItemRepository = new SituacaoExternaItemPedidoRepository();
    private readonly validacaoDados = new ValidacaoDados();

    async handle(request: {
        id: number;
        descricao: string;
        ativo: boolean;
    }) {
        const dadosCadastro = this.validarCadastro(request);

        if (!this.validacaoDados.valido())
            return this.returnNotifications(this.validacaoDados.recuperarErros());

        let opcoesBuscaPorId: any = {};
        opcoesBuscaPorId.camposRetorno = ['id'];
        opcoesBuscaPorId.filtro = { id: dadosCadastro.id };
        if (await this.situacaoExternaItemRepository.retornarEntidade(opcoesBuscaPorId))
            return this.returnNotifications([{ mensagem: 'ID já existente no sistema' }]);

        let opcoesBuscaPorDescricao: any = {};
        opcoesBuscaPorDescricao.camposRetorno = ['id'];
        opcoesBuscaPorDescricao.filtro = { descricao: dadosCadastro.descricao };
        if (await this.situacaoExternaItemRepository.retornarEntidade(opcoesBuscaPorDescricao))
            return this.returnNotifications([{ mensagem: 'DESCRIÇÃO já existente no sistema' }]);

        const situacaoExternaItemPedido = new SituacaoExternaItemPedido();
        situacaoExternaItemPedido.novaSituacaoExternaItemPedido({
            id: dadosCadastro.id,
            descricao: dadosCadastro.descricao,
            ativo: dadosCadastro.ativo
        })
        await this.situacaoExternaItemRepository.salvarEntidade(situacaoExternaItemPedido);

        return this.returnSuccess(situacaoExternaItemPedido);
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
