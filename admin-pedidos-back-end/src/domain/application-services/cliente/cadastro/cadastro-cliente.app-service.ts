import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { extrairNumerosTexto, ValidacaoDados } from "../../../../core/helpers";
import { ClienteRepository } from "../../../../infra/data/repositories/cliente.repository";
import { Cliente } from "../../../entities";
import { CadastroClienteRequest } from "./cadastro-cliente.request";

export class CadastroClienteAppService extends AppService {
    private readonly clienteRepository = new ClienteRepository();
    private readonly validacaoDados = new ValidacaoDados();

    async handle(model: CadastroClienteRequest) {
        const dadosCadastro = this.validarCadastro(model);

        if (!this.validacaoDados.valido())
            return this.returnNotifications(this.validacaoDados.recuperarErros());

        let opcoesBuscaPorCpfCnpj: any = {
            camposRetorno: ['id'],
            filtro: { cpfCnpj: dadosCadastro.cpfCnpj }
        };
        if ((await this.clienteRepository.retornarEntidade(opcoesBuscaPorCpfCnpj)))
            return this.returnNotifications([{ mensagem: 'CPF/CNPJ já existente no sistema' }]);

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
        await this.clienteRepository.salvarEntidade(novoCliente);

        return this.returnSuccess<Cliente>(novoCliente);
    }

    private validarCadastro(dadosRequisicao: CadastroClienteRequest) {
        const dadosCadastro = dadosRequisicao;

        dadosCadastro.cpfCnpj = extrairNumerosTexto(dadosCadastro.cpfCnpj);

        this.validacaoDados.obrigatorio(dadosCadastro.nome, 'NOME obrigatório');
        this.validacaoDados.tamanhoMinimo(dadosCadastro.nome, 2, 'NOME inválido');
        this.validacaoDados.tamanhoMaximo(dadosCadastro.nome, 45, 'NOME inválido');

        this.validacaoDados.tamanhoMinimo(dadosCadastro.nomeGuerra, 2, 'NOME DE GUERRA inválido');
        this.validacaoDados.tamanhoMaximo(dadosCadastro.nomeGuerra, 45, 'NOME DE GUERRA inválido');

        this.validacaoDados.obrigatorio(dadosCadastro.idTipoCliente, 'TIPO DE CLIENTE obrigatório');

        this.validacaoDados.obrigatorio(dadosCadastro.cpfCnpj, 'CPF/CNPJ obrigatório');

        if (ValidacaoDados.eUmCpf(dadosCadastro.cpfCnpj))
            this.validacaoDados.validarCpf(dadosCadastro.cpfCnpj, 'CPF invalido');
        else
            this.validacaoDados.validarCnpj(dadosCadastro.cpfCnpj, 'CNPJ inválido');

        this.validacaoDados.tamanhoMinimo(dadosCadastro.logradouro, 2, 'LOGRADOURO inválido');
        this.validacaoDados.tamanhoMaximo(dadosCadastro.logradouro, 150, 'LOGRADOURO inválido');

        this.validacaoDados.validarCep(dadosCadastro.cep, 'CEP inválido');

        this.validacaoDados.tamanhoMinimo(dadosCadastro.nomeCidade, 2, 'NOME CIDADE inválido');
        this.validacaoDados.tamanhoMaximo(dadosCadastro.nomeCidade, 150, 'NOME CIDADE inválido');

        this.validacaoDados.tamanhoIgual(dadosCadastro.siglaUf, 2, 'UF inválida');

        this.validacaoDados.validarTelefone(dadosCadastro.telefone, 'TELEFONE inválido');

        this.validacaoDados.validarEmail(dadosCadastro.email, 'E-MAIL inválido');
        this.validacaoDados.tamanhoMaximo(dadosCadastro.email, 100, 'E-MAIL inválido');

        this.validacaoDados.tamanhoMaximo(dadosCadastro.tipoSanguineo, 10, 'corriga TIPO SANGUÍNEO');

        dadosCadastro.cep = extrairNumerosTexto(dadosCadastro.cep);
        dadosCadastro.telefone = extrairNumerosTexto(dadosCadastro.telefone);

        return dadosCadastro;
    }
} 
