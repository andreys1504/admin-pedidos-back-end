import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ValidacaoDados } from "../../../../core/helpers";
import { TipoClienteRepository } from "../../../../infra/data/repositories/tipo-cliente.repository";
import { TipoCliente } from "../../../entities";
import { CadastroTipoClienteRequest } from "./cadastro-tipo-cliente.request";

export class CadastroTipoClienteAppService extends AppService {
    constructor(
        private readonly validacaoDados: ValidacaoDados,
        private readonly tipoClienteRepository: TipoClienteRepository
    ) {
        super();
    }

    async handle(model: CadastroTipoClienteRequest) {
        const dadosCadastro = this.validarCadastro(model);
        if (!this.validacaoDados.valido())
            return this.returnNotifications(this.validacaoDados.recuperarErros());

        const opcoesBuscaPorId: any = {};
        opcoesBuscaPorId.camposRetorno = ['id'];
        opcoesBuscaPorId.filtro = { id: dadosCadastro.id };
        if (await this.tipoClienteRepository.retornarEntidade(opcoesBuscaPorId))
            return this.returnNotifications([{ mensagem: 'ID já existente no sistema' }]);

        const opcoesBuscaPorDescricao: any = {};
        opcoesBuscaPorDescricao.camposRetorno = ['id'];
        opcoesBuscaPorDescricao.filtro = { descricao: dadosCadastro.descricao };
        if (await this.tipoClienteRepository.retornarEntidade(opcoesBuscaPorDescricao))
            return this.returnNotifications([{ mensagem: 'DESCRIÇÃO já existente no sistema' }]);

        const tipoCliente = new TipoCliente();
        tipoCliente.novoTipoCliente({
            id: dadosCadastro.id,
            descricao: dadosCadastro.descricao,
            ativo: dadosCadastro.ativo
        });
        await this.tipoClienteRepository.salvarEntidade(tipoCliente);

        return this.returnSuccess({ mensagem: 'Tipo Cliente cadastrado com sucesso!' });
    }

    private validarCadastro(dadosCadastro: CadastroTipoClienteRequest) {
        this.validacaoDados.obrigatorio(dadosCadastro.id, 'ID obrigatório');
        this.validacaoDados.menorMaior(dadosCadastro.id, 1, 999, 'ID inválido');

        this.validacaoDados.obrigatorio(dadosCadastro.descricao, 'DESCRIÇÃO obrigatória');
        this.validacaoDados.tamanhoMinimo(dadosCadastro.descricao, 2, 'DESCRIÇÃO inválida');
        this.validacaoDados.tamanhoMaximo(dadosCadastro.descricao, 45, 'DESCRIÇÃO inválida');

        this.validacaoDados.obrigatorio(dadosCadastro.ativo, 'ATIVO obrigatório');

        return dadosCadastro;
    }
}
