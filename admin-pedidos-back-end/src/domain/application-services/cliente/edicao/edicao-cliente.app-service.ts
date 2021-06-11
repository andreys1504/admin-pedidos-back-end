import { EdicaoViewModelAppService } from "./edicao-cliente.request";
import { ClientesParaEdicaoDadosAppService } from "../clientes-para-edicao-dados/clientes-para-edicao-dados.app-service";
import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { extrairNumerosTexto, ValidacaoDados } from "../../../../core/helpers";
import { ClienteRepositorio } from "../../../../infra/data/repositories/cliente.repositorio";

export class EdicaoClienteAppService extends AppService {
    private readonly validacaoDados = new ValidacaoDados();
    private readonly clienteRepositorio = new ClienteRepositorio();
    private readonly clientesParaEdicaoDadosServicoApp = new ClientesParaEdicaoDadosAppService();

    async executar(model: EdicaoViewModelAppService) {
        const dadosEdicao = this.validarDadosEdicao(model);

        if (!this.validacaoDados.valido() || !dadosEdicao.idCliente)
            return this.retornoErro(this.validacaoDados.recuperarErros());

        const opcoesBuscaClienteEdicao: any = {};
        opcoesBuscaClienteEdicao.filtro = { id: dadosEdicao.idCliente };
        const clienteEdicao = await this.clienteRepositorio.retornarEntidade(opcoesBuscaClienteEdicao);
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

        await this.clienteRepositorio.salvarEntidade(clienteEdicao);
        const clienteRetorno = await this.clientesParaEdicaoDadosServicoApp.executar({ nomeCpfCnpj: clienteEdicao.cpfCnpj });
        return this.retornoSucesso(clienteRetorno.dados[0]);
    }

    private validarDadosEdicao(dadosEdicao: EdicaoViewModelAppService) {
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
