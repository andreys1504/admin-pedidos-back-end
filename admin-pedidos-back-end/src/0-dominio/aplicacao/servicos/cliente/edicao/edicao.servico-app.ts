import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao"
import { EdicaoViewModelServicoApp } from "./edicao.view-model.servico-app";
import { ValidacaoDados, extrairNumerosTexto } from "../../../../../0-core/helpers";
import { ClienteRepositorio } from "../../../../repositorios/cliente.repositorio";
import { ClientesParaEdicaoDadosServicoApp } from "../clientes-para-edicao-dados/clientes-para-edicao-dados.servico-app";

export class EdicaoServicoApp extends ServicoAplicacao {
    private readonly _validacaoDados = new ValidacaoDados();
    private readonly _clienteRepositorio = new ClienteRepositorio();
    private readonly _clientesParaEdicaoDadosServicoApp = new ClientesParaEdicaoDadosServicoApp();

    async executar(model: EdicaoViewModelServicoApp) {
        const dadosEdicao = this.validarDadosEdicao(model);

        if (!this._validacaoDados.valido() || !dadosEdicao.idCliente)
            return this.retornoErro(this._validacaoDados.recuperarErros());

        const opcoesBuscaClienteEdicao: any = {};
        opcoesBuscaClienteEdicao.filtro = { id: dadosEdicao.idCliente };
        const clienteEdicao = await this._clienteRepositorio.retornarEntidade(opcoesBuscaClienteEdicao);
        if (!clienteEdicao)
            throw new Error('CLIENTE inválido');

        clienteEdicao.editar({
            cep: dadosEdicao.cep,
            email: dadosEdicao.email,
            logradouro: dadosEdicao.logradouro,
            nome: dadosEdicao.nome,
            nomeCidade: dadosEdicao.nomeCidade,
            nomeGuerra: dadosEdicao.nomeGuerra,
            siglaUf: dadosEdicao.siglaUf,
            telefone: dadosEdicao.telefone,
            idTipoCliente: dadosEdicao.idTipoCliente,
            tipoSanguineo: dadosEdicao.tipoSanguineo,
            medidasCliente: dadosEdicao.medidasCliente
        });

        await this._clienteRepositorio.salvarEntidade(clienteEdicao);
        const clienteRetorno = await this._clientesParaEdicaoDadosServicoApp.executar({ nomeCpfCnpj: clienteEdicao.cpfCnpj });
        return this.retornoSucesso(clienteRetorno.dados[0]);
    }

    private validarDadosEdicao(dadosEdicao: EdicaoViewModelServicoApp) {
        this._validacaoDados.obrigatorio(dadosEdicao.nome, 'NOME obrigatório');
        this._validacaoDados.tamanhoMinimo(dadosEdicao.nome, 2, 'NOME inválido');
        this._validacaoDados.tamanhoMaximo(dadosEdicao.nome, 45, 'NOME inválido');

        this._validacaoDados.tamanhoMinimo(dadosEdicao.nomeGuerra, 2, 'NOME DE GUERRA inválido');
        this._validacaoDados.tamanhoMaximo(dadosEdicao.nomeGuerra, 45, 'NOME DE GUERRA inválido');

        this._validacaoDados.obrigatorio(dadosEdicao.idTipoCliente, 'TIPO DE CLIENTE obrigatório');

        this._validacaoDados.tamanhoMinimo(dadosEdicao.logradouro, 2, 'LOGRADOURO inválido');
        this._validacaoDados.tamanhoMaximo(dadosEdicao.logradouro, 150, 'LOGRADOURO inválido');

        this._validacaoDados.validarCep(dadosEdicao.cep, 'CEP inválido');

        this._validacaoDados.tamanhoMinimo(dadosEdicao.nomeCidade, 2, 'NOME CIDADE inválido');
        this._validacaoDados.tamanhoMaximo(dadosEdicao.nomeCidade, 150, 'NOME CIDADE inválido');

        this._validacaoDados.tamanhoIgual(dadosEdicao.siglaUf, 2, 'UF inválida');

        this._validacaoDados.validarTelefone(dadosEdicao.telefone, 'TELEFONE inválido');

        this._validacaoDados.validarEmail(dadosEdicao.email, 'E-MAIL inválido');
        this._validacaoDados.tamanhoMaximo(dadosEdicao.email, 100, 'E-MAIL inválido');

        this._validacaoDados.tamanhoMaximo(dadosEdicao.tipoSanguineo, 10, 'corriga TIPO SANGUÍNEO');

        dadosEdicao.cep = extrairNumerosTexto(dadosEdicao.cep);
        dadosEdicao.telefone = extrairNumerosTexto(dadosEdicao.telefone);

        return dadosEdicao;
    }
}