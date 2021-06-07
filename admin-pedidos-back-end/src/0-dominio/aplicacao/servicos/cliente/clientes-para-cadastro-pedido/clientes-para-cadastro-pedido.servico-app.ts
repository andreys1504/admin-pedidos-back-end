import { ClientesParaCadastroPedidoViewModelServicoApp } from "./clientes-para-cadastro-pedido.view-model.servico-app";
import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { ValidacaoDados, extrairNumerosTexto } from "../../../../../0-core/helpers";
import { Cliente } from "../../../../entidades";
import { ClienteRepositorio } from "../../../../repositorios/cliente.repositorio";

export class ClienteParaCadastroPedidoServicoApp extends ServicoAplicacao {
    private readonly _clienteRepositorio = new ClienteRepositorio();
    private readonly _validacaoDados = new ValidacaoDados();
    private readonly _camposRetorno: string[];

    constructor() {
        super();
        this._camposRetorno = [
            'id',
            'nome',
            'tipoClienteId',
            'cpfCnpj',
            'medidasCliente'
        ];
    }

    async executar(model: ClientesParaCadastroPedidoViewModelServicoApp) {
        const nomeCpfCnpj = model.nomeCpfCnpj;
        if (!nomeCpfCnpj)
            return this.retornoErro([{ mensagem: '' }]);

        let clientes: Cliente[] = [];

        const cpfCnpj = extrairNumerosTexto(nomeCpfCnpj);
        if (cpfCnpj)
            clientes = await this.clientesPorCpfCnpj(cpfCnpj);
        else
            clientes = await this.clientesPorNome(nomeCpfCnpj);

        if (!this._validacaoDados.valido())
            return this.retornoErro(this._validacaoDados.recuperarErros());

        return this.retornoSucesso(clientes);
    }

    private async clientesPorCpfCnpj(cpfCnpj: string) {
        if (ValidacaoDados.eUmCpf(cpfCnpj))
            this._validacaoDados.validarCpf(cpfCnpj, 'CPF ou CNPJ inválidos');
        else
            this._validacaoDados.validarCnpj(cpfCnpj, 'CPF ou CNPJ inválidos');

        if (this._validacaoDados.valido()) {
            const opcoesBuscaClientes: any = {
                filtro: { cpfCnpj: cpfCnpj },
                camposRetorno: this._camposRetorno
            };

            const cliente = await this._clienteRepositorio.retornarEntidade(opcoesBuscaClientes);

            return (cliente ? [{ ...cliente }] : []) as Cliente[];
        }

        return [] as Cliente[];
    }

    private async clientesPorNome(nome: string) {
        this._validacaoDados.obrigatorio(nome, 'NOME não informado');
        if (!Cliente.nomeClienteValido(nome))
            this._validacaoDados.adicionarMensagem('NOME inválido');

        if (this._validacaoDados.valido()) {
            const opcoesBuscaClientesPorNome: any = {
                nome: nome,
                camposRetorno: this._camposRetorno
            };

            return await this._clienteRepositorio.clientesPorConteudoNome(opcoesBuscaClientesPorNome);
        }

        return [] as Cliente[];
    }
}