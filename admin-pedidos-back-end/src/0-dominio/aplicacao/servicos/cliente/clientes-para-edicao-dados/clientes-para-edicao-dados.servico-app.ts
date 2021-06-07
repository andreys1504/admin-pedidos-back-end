import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { ValidacaoDados, extrairNumerosTexto } from "../../../../../0-core/helpers";
import { ClientesParaEdicaoDadosViewModelServicoApp } from "./clientes-para-edicao-dados.view-model.servico-app";
import { Cliente, TipoCliente } from "../../../../entidades";
import { TipoClienteRepositorio } from "../../../../repositorios/tipo-cliente.repositorio";
import { ClienteRepositorio } from "../../../../repositorios/cliente.repositorio";

export class ClientesParaEdicaoDadosServicoApp extends ServicoAplicacao {
    private readonly _validacaoDados = new ValidacaoDados();
    private readonly _tipoClienteRepositorio = new TipoClienteRepositorio();
    private readonly _clienteRepositorio = new ClienteRepositorio();

    async executar(model: ClientesParaEdicaoDadosViewModelServicoApp) {
        if (!model.nomeCpfCnpj)
            return this.retornoErro([{ mensagem: '' }]);

        const clientes = await this.buscarClientesParaEdicaoDados(model.nomeCpfCnpj);

        if (!this._validacaoDados.valido())
            return this.retornoErro(this._validacaoDados.recuperarErros());

        return this.retornoSucesso(clientes);
    }

    private async buscarClientesParaEdicaoDados(nomeCpfCnpj: string) {
        let clientes: Cliente[] = [];

        const tiposClientes = await this._tipoClienteRepositorio
            .retornarColecaoEntidade({ camposRetorno: ['id', 'descricao'] });

        const opcoesBusca: any = {};

        const cpfCnpj = extrairNumerosTexto(nomeCpfCnpj);
        if (cpfCnpj) {
            if (ValidacaoDados.eUmCpf(cpfCnpj))
                this._validacaoDados.validarCpf(cpfCnpj, 'CPF ou CNPJ inválido');
            else
                this._validacaoDados.validarCnpj(cpfCnpj, 'CPF ou CNPJ inválido');

            if (this._validacaoDados.valido()) {
                opcoesBusca.filtro = { cpfCnpj };
                clientes = await this._clienteRepositorio.retornarColecaoEntidade(opcoesBusca);
            }
        }
        else {
            if (!Cliente.nomeClienteValido(nomeCpfCnpj))
                this._validacaoDados.adicionarMensagem('NOME inválido');

            if (this._validacaoDados.valido()) {
                opcoesBusca.filtro = { nome: nomeCpfCnpj };
                clientes = await this._clienteRepositorio.clientesPorConteudoNome(opcoesBusca);
            }
        }

        if (clientes && clientes.length > 0 && tiposClientes && tiposClientes.length > 0)
            clientes = this.vincularTipoCliente({ clientes, tiposClientes });

        return clientes;
    }

    private vincularTipoCliente(dados: {
        clientes: Cliente[],
        tiposClientes: TipoCliente[]
    }) {
        dados.clientes = dados.clientes.map((cliente) => {
            cliente.tipoCliente
                = dados.tiposClientes.find(tipoCliente => tipoCliente.id === cliente.tipoClienteId)
                || {} as TipoCliente;

            return cliente;
        });

        return dados.clientes;
    }
}