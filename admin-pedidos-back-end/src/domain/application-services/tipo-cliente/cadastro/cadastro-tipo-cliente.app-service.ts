import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ValidacaoDados } from "../../../../core/helpers";
import { TipoClienteRepositorio } from "../../../../infra/data/repositories/tipo-cliente.repositorio";
import { TipoCliente } from "../../../entities";
import { CadastroTipoClienteRequest } from "./cadastro-tipo-cliente.request";

export class CadastroTipoClienteAppService extends AppService {
    constructor(
        private readonly validacaoDados: ValidacaoDados,
        private readonly tipoClienteRepositorio: TipoClienteRepositorio
    ) {
        super();
    }

    async executar(model: CadastroTipoClienteRequest) {
        const dadosCadastro = this.validarCadastro(model);
        if (!this.validacaoDados.valido())
            return this.retornoErro(this.validacaoDados.recuperarErros());

        const opcoesBuscaPorId: any = {};
        opcoesBuscaPorId.camposRetorno = ['id'];
        opcoesBuscaPorId.filtro = { id: dadosCadastro.id };
        if (await this.tipoClienteRepositorio.retornarEntidade(opcoesBuscaPorId))
            return this.retornoErro([{ mensagem: 'ID já existente no sistema' }]);

        const opcoesBuscaPorDescricao: any = {};
        opcoesBuscaPorDescricao.camposRetorno = ['id'];
        opcoesBuscaPorDescricao.filtro = { descricao: dadosCadastro.descricao };
        if (await this.tipoClienteRepositorio.retornarEntidade(opcoesBuscaPorDescricao))
            return this.retornoErro([{ mensagem: 'DESCRIÇÃO já existente no sistema' }]);

        const tipoCliente = new TipoCliente();
        tipoCliente.novoTipoCliente({
            id: dadosCadastro.id,
            descricao: dadosCadastro.descricao,
            ativo: dadosCadastro.ativo
        });
        await this.tipoClienteRepositorio.salvarEntidade(tipoCliente);

        return this.retornoSucesso({ mensagem: 'Tipo Cliente cadastrado com sucesso!' });
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
