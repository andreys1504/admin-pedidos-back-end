import { ValidacaoDados, extrairNumerosTexto } from "../../../../../0-core/helpers";
import { CadastroClienteViewModelServicoApp } from "./cadastro-cliente.view-model.servico-app";
import { ClienteRepositorio } from "../../../../repositorios/cliente.repositorio";
import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { Cliente } from "../../../../entidades";

export class CadastroClienteServicoApp extends ServicoAplicacao {
    private readonly _clienteRepositorio = new ClienteRepositorio();
    private readonly _validacaoDados = new ValidacaoDados();

    async executar(model: CadastroClienteViewModelServicoApp) {
        const dadosCadastro = this.validarCadastro(model);

        if (!this._validacaoDados.valido())
            return this.retornoErro(this._validacaoDados.recuperarErros());

        let opcoesBuscaPorCpfCnpj: any = {
            camposRetorno: ['id'],
            filtro: { cpfCnpj: dadosCadastro.cpfCnpj }
        };
        if ((await this._clienteRepositorio.retornarEntidade(opcoesBuscaPorCpfCnpj)))
            return this.retornoErro([{ mensagem: 'CPF/CNPJ já existente no sistema' }]);

        const novoCliente = new Cliente();
        novoCliente.novoCliente({
            nome: dadosCadastro.nome,
            nomeGuerra: dadosCadastro.nomeGuerra,
            idTipoCliente: dadosCadastro.idTipoCliente,
            cpfCnpj: dadosCadastro.cpfCnpj,
            logradouro: dadosCadastro.logradouro,
            cep: dadosCadastro.cep,
            nomeCidade: dadosCadastro.nomeCidade,
            siglaUf: dadosCadastro.siglaUf,
            telefone: dadosCadastro.telefone,
            email: dadosCadastro.email,
            tipoSanguineo: dadosCadastro.tipoSanguineo,
            medidasCliente: dadosCadastro.medidasCliente
        });
        await this._clienteRepositorio.salvarEntidade(novoCliente);

        return this.retornoSucesso<Cliente>(novoCliente);
    }

    private validarCadastro(dadosRequisicao: CadastroClienteViewModelServicoApp) {
        const dadosCadastro = dadosRequisicao;

        dadosCadastro.cpfCnpj = extrairNumerosTexto(dadosCadastro.cpfCnpj);

        this._validacaoDados.obrigatorio(dadosCadastro.nome, 'NOME obrigatório');
        this._validacaoDados.tamanhoMinimo(dadosCadastro.nome, 2, 'NOME inválido');
        this._validacaoDados.tamanhoMaximo(dadosCadastro.nome, 45, 'NOME inválido');

        this._validacaoDados.tamanhoMinimo(dadosCadastro.nomeGuerra, 2, 'NOME DE GUERRA inválido');
        this._validacaoDados.tamanhoMaximo(dadosCadastro.nomeGuerra, 45, 'NOME DE GUERRA inválido');

        this._validacaoDados.obrigatorio(dadosCadastro.idTipoCliente, 'TIPO DE CLIENTE obrigatório');

        this._validacaoDados.obrigatorio(dadosCadastro.cpfCnpj, 'CPF/CNPJ obrigatório');

        if (ValidacaoDados.eUmCpf(dadosCadastro.cpfCnpj))
            this._validacaoDados.validarCpf(dadosCadastro.cpfCnpj, 'CPF invalido');
        else
            this._validacaoDados.validarCnpj(dadosCadastro.cpfCnpj, 'CNPJ inválido');

        this._validacaoDados.tamanhoMinimo(dadosCadastro.logradouro, 2, 'LOGRADOURO inválido');
        this._validacaoDados.tamanhoMaximo(dadosCadastro.logradouro, 150, 'LOGRADOURO inválido');

        this._validacaoDados.validarCep(dadosCadastro.cep, 'CEP inválido');

        this._validacaoDados.tamanhoMinimo(dadosCadastro.nomeCidade, 2, 'NOME CIDADE inválido');
        this._validacaoDados.tamanhoMaximo(dadosCadastro.nomeCidade, 150, 'NOME CIDADE inválido');

        this._validacaoDados.tamanhoIgual(dadosCadastro.siglaUf, 2, 'UF inválida');

        this._validacaoDados.validarTelefone(dadosCadastro.telefone, 'TELEFONE inválido');

        this._validacaoDados.validarEmail(dadosCadastro.email, 'E-MAIL inválido');
        this._validacaoDados.tamanhoMaximo(dadosCadastro.email, 100, 'E-MAIL inválido');

        this._validacaoDados.tamanhoMaximo(dadosCadastro.tipoSanguineo, 10, 'corriga TIPO SANGUÍNEO');

        dadosCadastro.cep = extrairNumerosTexto(dadosCadastro.cep);
        dadosCadastro.telefone = extrairNumerosTexto(dadosCadastro.telefone);

        return dadosCadastro;
    }
} 