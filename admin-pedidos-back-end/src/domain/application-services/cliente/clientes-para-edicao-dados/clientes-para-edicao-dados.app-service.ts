import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { extrairNumerosTexto, ValidacaoDados } from "../../../../core/helpers";
import { ClienteRepository } from "../../../../infra/data/repositories/cliente.repository";
import { TipoClienteRepository } from "../../../../infra/data/repositories/tipo-cliente.repository";
import { Cliente, TipoCliente } from "../../../entities";
import { ClientesParaEdicaoDadosRequest } from "./clientes-para-edicao-dados.request";

export class ClientesParaEdicaoDadosAppService extends AppService {
    private readonly validacaoDados = new ValidacaoDados();
    private readonly tipoClienteRepository = new TipoClienteRepository();
    private readonly clienteRepository = new ClienteRepository();

    async handle(request: ClientesParaEdicaoDadosRequest) {
        if (!request.nomeCpfCnpj)
            return this.returnNotifications([{ mensagem: '' }]);

        const clientes = await this.buscarClientesParaEdicaoDados(request.nomeCpfCnpj);

        if (!this.validacaoDados.valido())
            return this.returnNotifications(this.validacaoDados.recuperarErros());

        return this.returnSuccess(clientes);
    }

    private async buscarClientesParaEdicaoDados(nomeCpfCnpj: string) {
        let clientes: Cliente[] = [];

        const tiposClientes = await this.tipoClienteRepository
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
                clientes = await this.clienteRepository.retornarColecaoEntidade(opcoesBusca);
            }
        }
        else {
            if (!Cliente.nomeClienteValido(nomeCpfCnpj))
                this.validacaoDados.adicionarMensagem('NOME inválido');

            if (this.validacaoDados.valido()) {
                opcoesBusca.filtro = { nome: nomeCpfCnpj };
                clientes = await this.clienteRepository.clientesPorConteudoNome(opcoesBusca);
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
