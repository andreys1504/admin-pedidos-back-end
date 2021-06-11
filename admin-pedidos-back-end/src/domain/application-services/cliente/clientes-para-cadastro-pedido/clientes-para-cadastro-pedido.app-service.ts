import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { extrairNumerosTexto, ValidacaoDados } from "../../../../core/helpers";
import { ClienteRepository } from "../../../../infra/data/repositories/cliente.repository";
import { Cliente } from "../../../entities";
import { ClientesParaCadastroPedidoRequest } from "./clientes-para-cadastro-pedido.request";

export class ClienteParaCadastroAppService extends AppService {
    private readonly clienteRepository = new ClienteRepository();
    private readonly validacaoDados = new ValidacaoDados();
    private readonly camposRetorno: string[];

    constructor() {
        super();
        this.camposRetorno = [
            'id',
            'nome',
            'tipoClienteId',
            'cpfCnpj',
            'medidasCliente'
        ];
    }

    async handle(request: ClientesParaCadastroPedidoRequest) {
        const nomeCpfCnpj = request.nomeCpfCnpj;
        if (!nomeCpfCnpj)
            return this.returnNotifications([{ mensagem: '' }]);

        let clientes: Cliente[] = [];

        const cpfCnpj = extrairNumerosTexto(nomeCpfCnpj);
        if (cpfCnpj)
            clientes = await this.clientesPorCpfCnpj(cpfCnpj);
        else
            clientes = await this.clientesPorNome(nomeCpfCnpj);

        if (!this.validacaoDados.valido())
            return this.returnNotifications(this.validacaoDados.recuperarErros());

        return this.returnSuccess(clientes);
    }

    private async clientesPorCpfCnpj(cpfCnpj: string) {
        if (ValidacaoDados.eUmCpf(cpfCnpj))
            this.validacaoDados.validarCpf(cpfCnpj, 'CPF ou CNPJ inválidos');
        else
            this.validacaoDados.validarCnpj(cpfCnpj, 'CPF ou CNPJ inválidos');

        if (this.validacaoDados.valido()) {
            const opcoesBuscaClientes: any = {
                filtro: { cpfCnpj: cpfCnpj },
                camposRetorno: this.camposRetorno
            };

            const cliente = await this.clienteRepository.retornarEntidade(opcoesBuscaClientes);

            return (cliente ? [{ ...cliente }] : []) as Cliente[];
        }

        return [] as Cliente[];
    }

    private async clientesPorNome(nome: string) {
        this.validacaoDados.obrigatorio(nome, 'NOME não informado');
        if (!Cliente.nomeClienteValido(nome))
            this.validacaoDados.adicionarMensagem('NOME inválido');

        if (this.validacaoDados.valido()) {
            const opcoesBuscaClientesPorNome: any = {
                nome: nome,
                camposRetorno: this.camposRetorno
            };

            return await this.clienteRepository.clientesPorConteudoNome(opcoesBuscaClientesPorNome);
        }

        return [] as Cliente[];
    }
}
