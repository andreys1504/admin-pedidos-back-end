import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { getNumbersText } from "../../../../core/helpers";
import { ClienteRepository } from "../../../../infra/data/repositories/cliente.repository";
import { Cliente } from "../../../entities";
import { ClientesParaCadastroPedidoRequest } from "./clientes-para-cadastro-pedido.request";

export class ClienteParaCadastroAppService extends AppService<Cliente[]> {
  private readonly clienteRepository = new ClienteRepository();
  private readonly camposRetorno: string[];

  constructor() {
    super();
    this.camposRetorno = [
      "id",
      "nome",
      "tipoClienteId",
      "cpfCnpj",
      "medidasCliente",
    ];
  }

  async handleAsync(request: ClientesParaCadastroPedidoRequest) {
    if (request.validate() === false) {
      return this.returnNotifications(request.getNotifications);
    }

    let clientes: Cliente[] = [];

    const cpfCnpj = getNumbersText(request.requestModel.nomeCpfCnpj);
    if (cpfCnpj) {
      const clientePorCpfCnpj = await this.clientesPorCpfCnpj(cpfCnpj);
      if (clientePorCpfCnpj) {
        clientes = [clientePorCpfCnpj];
      }
    } else {
      clientes = await this.clientesPorNome(request.requestModel.nomeCpfCnpj);
    }

    return this.returnData(clientes);
  }

  private async clientesPorCpfCnpj(cpfCnpj: string) {
    const opcoesBuscaClientes: any = {
      filtro: { cpfCnpj: cpfCnpj },
      camposRetorno: this.camposRetorno,
    };

    return await this.clienteRepository.entidadeAsync(opcoesBuscaClientes);
  }

  private async clientesPorNome(nome: string) {
    const opcoesBuscaClientesPorNome: any = {
      nome: nome,
      camposRetorno: this.camposRetorno,
    };

    return await this.clienteRepository.clientesPorConteudoNome(
      opcoesBuscaClientesPorNome
    );
  }
}
