import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao"
import { CadastroTipoClienteViewModelServicoApp } from "./cadastro-tipo-cliente.view-model.servico-app";
import { ValidacaoDados } from "../../../../../0-core/helpers";
import { TipoCliente } from "../../../../entidades";
import { TipoClienteRepositorio } from "../../../../repositorios/tipo-cliente.repositorio";

export class CadastroTipoClienteServicoApp extends ServicoAplicacao {
    constructor(
        private readonly _validacaoDados: ValidacaoDados,
        private readonly _tipoClienteRepositorio: TipoClienteRepositorio
    ) {
        super();
    }

    async executar(model: CadastroTipoClienteViewModelServicoApp) {
        const dadosCadastro = this.validarCadastro(model);
        if (!this._validacaoDados.valido())
            return this.retornoErro(this._validacaoDados.recuperarErros());

        const opcoesBuscaPorId: any = {};
        opcoesBuscaPorId.camposRetorno = ['id'];
        opcoesBuscaPorId.filtro = { id: dadosCadastro.id };
        if (await this._tipoClienteRepositorio.retornarEntidade(opcoesBuscaPorId))
            return this.retornoErro([{ mensagem: 'ID já existente no sistema' }]);

        const opcoesBuscaPorDescricao: any = {};
        opcoesBuscaPorDescricao.camposRetorno = ['id'];
        opcoesBuscaPorDescricao.filtro = { descricao: dadosCadastro.descricao };
        if (await this._tipoClienteRepositorio.retornarEntidade(opcoesBuscaPorDescricao))
            return this.retornoErro([{ mensagem: 'DESCRIÇÃO já existente no sistema' }]);

        const tipoCliente = new TipoCliente();
        tipoCliente.novoTipoCliente({
            id: dadosCadastro.id,
            descricao: dadosCadastro.descricao,
            ativo: dadosCadastro.ativo
        });
        await this._tipoClienteRepositorio.salvarEntidade(tipoCliente);

        return this.retornoSucesso({ mensagem: 'Tipo Cliente cadastrado com sucesso!' });
    }

    private validarCadastro(dadosCadastro: CadastroTipoClienteViewModelServicoApp) {
        this._validacaoDados.obrigatorio(dadosCadastro.id, 'ID obrigatório');
        this._validacaoDados.menorMaior(dadosCadastro.id, 1, 999, 'ID inválido');

        this._validacaoDados.obrigatorio(dadosCadastro.descricao, 'DESCRIÇÃO obrigatória');
        this._validacaoDados.tamanhoMinimo(dadosCadastro.descricao, 2, 'DESCRIÇÃO inválida');
        this._validacaoDados.tamanhoMaximo(dadosCadastro.descricao, 45, 'DESCRIÇÃO inválida');

        this._validacaoDados.obrigatorio(dadosCadastro.ativo, 'ATIVO obrigatório');

        return dadosCadastro;
    }
}