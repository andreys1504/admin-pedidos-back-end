import { EdicaoClienteRequest } from "./edicao-cliente.request";
import { ClientesParaEdicaoDadosAppService } from "../clientes-para-edicao-dados/clientes-para-edicao-dados.app-service";
import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { extrairNumerosTexto, ValidacaoDados } from "../../../../core/helpers";
import { ClienteRepository } from "../../../../infra/data/repositories/cliente.repository";

export class EdicaoClienteAppService extends AppService {
    private readonly validacaoDados = new ValidacaoDados();
    private readonly clienteRepository = new ClienteRepository();
    private readonly clientesParaEdicaoDadosAppService = new ClientesParaEdicaoDadosAppService();

    async handle(model: EdicaoClienteRequest) {
        const dadosEdicao = this.validarDadosEdicao(model);

        if (!this.validacaoDados.valido() || !dadosEdicao.idCliente)
            return this.returnNotifications(this.validacaoDados.recuperarErros());

        const opcoesBuscaClienteEdicao: any = {};
        opcoesBuscaClienteEdicao.filtro = { id: dadosEdicao.idCliente };
        const clienteEdicao = await this.clienteRepository.retornarEntidade(opcoesBuscaClienteEdicao);
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

        await this.clienteRepository.salvarEntidade(clienteEdicao);
        const clienteRetorno = await this.clientesParaEdicaoDadosAppService.handle({ nomeCpfCnpj: clienteEdicao.cpfCnpj });
        return this.returnSuccess(clienteRetorno.data[0]);
    }

    private validarDadosEdicao(dadosEdicao: EdicaoClienteRequest) {
        this.validacaoDados.obrigatorio(dadosEdicao.nome, 'NOME obrigatório');
        this.validacaoDados.tamanhoMinimo(dadosEdicao.nome, 2, 'NOME inválido');
        this.validacaoDados.tamanhoMaximo(dadosEdicao.nome, 45, 'NOME inválido');

        this.validacaoDados.tamanhoMinimo(dadosEdicao.nomeGuerra, 2, 'NOME DE GUERRA inválido');
        this.validacaoDados.tamanhoMaximo(dadosEdicao.nomeGuerra, 45, 'NOME DE GUERRA inválido');

        this.validacaoDados.obrigatorio(dadosEdicao.idTipoCliente, 'TIPO DE CLIENTE obrigatório');

        this.validacaoDados.tamanhoMinimo(dadosEdicao.logradouro, 2, 'LOGRADOURO inválido');
        this.validacaoDados.tamanhoMaximo(dadosEdicao.logradouro, 150, 'LOGRADOURO inválido');

        this.validacaoDados.validarCep(dadosEdicao.cep, 'CEP inválido');

        this.validacaoDados.tamanhoMinimo(dadosEdicao.nomeCidade, 2, 'NOME CIDADE inválido');
        this.validacaoDados.tamanhoMaximo(dadosEdicao.nomeCidade, 150, 'NOME CIDADE inválido');

        this.validacaoDados.tamanhoIgual(dadosEdicao.siglaUf, 2, 'UF inválida');

        this.validacaoDados.validarTelefone(dadosEdicao.telefone, 'TELEFONE inválido');

        this.validacaoDados.validarEmail(dadosEdicao.email, 'E-MAIL inválido');
        this.validacaoDados.tamanhoMaximo(dadosEdicao.email, 100, 'E-MAIL inválido');

        this.validacaoDados.tamanhoMaximo(dadosEdicao.tipoSanguineo, 10, 'corriga TIPO SANGUÍNEO');

        dadosEdicao.cep = extrairNumerosTexto(dadosEdicao.cep);
        dadosEdicao.telefone = extrairNumerosTexto(dadosEdicao.telefone);

        return dadosEdicao;
    }
}
