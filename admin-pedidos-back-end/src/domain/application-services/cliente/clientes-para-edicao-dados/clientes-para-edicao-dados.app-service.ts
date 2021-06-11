import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { extrairNumerosTexto, ValidacaoDados } from "../../../../core/helpers";
import { ClienteRepositorio } from "../../../../infra/data/repositories/cliente.repositorio";
import { TipoClienteRepositorio } from "../../../../infra/data/repositories/tipo-cliente.repositorio";
import { Cliente, TipoCliente } from "../../../entities";
import { ClientesParaEdicaoDadosRequest } from "./clientes-para-edicao-dados.request";

export class ClientesParaEdicaoDadosAppService extends AppService {
    private readonly validacaoDados = new ValidacaoDados();
    private readonly tipoClienteRepositorio = new TipoClienteRepositorio();
    private readonly clienteRepositorio = new ClienteRepositorio();

    async executar(model: ClientesParaEdicaoDadosRequest) {
        if (!model.nomeCpfCnpj)
            return this.retornoErro([{ mensagem: '' }]);

        const clientes = await this.buscarClientesParaEdicaoDados(model.nomeCpfCnpj);

        if (!this.validacaoDados.valido())
            return this.retornoErro(this.validacaoDados.recuperarErros());

        return this.retornoSucesso(clientes);
    }

    private async buscarClientesParaEdicaoDados(nomeCpfCnpj: string) {
        let clientes: Cliente[] = [];

        const tiposClientes = await this.tipoClienteRepositorio
            .retornarColecaoEntidade({ camposRetorno: ['id', 'descricao'] });

        const opcoesBusca: any = {};

        const cpfCnpj = extrairNumerosTexto(nomeCpfCnpj);
        if (cpfCnpj) {
            if (ValidacaoDados.eUmCpf(cpfCnpj))
                this.validacaoDados.validarCpf(cpfCnpj, 'CPF ou CNPJ inválido');
            else
                this.validacaoDados.validarCnpj(cpfCnpj, 'CPF ou CNPJ inválido');

            if (this.validacaoDados.valido()) {
                opcoesBusca.filtro = { cpfCnpj };
                clientes = await this.clienteRepositorio.retornarColecaoEntidade(opcoesBusca);
            }
        }
        else {
            if (!Cliente.nomeClienteValido(nomeCpfCnpj))
                this.validacaoDados.adicionarMensagem('NOME inválido');

            if (this.validacaoDados.valido()) {
                opcoesBusca.filtro = { nome: nomeCpfCnpj };
                clientes = await this.clienteRepositorio.clientesPorConteudoNome(opcoesBusca);
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
